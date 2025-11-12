'use client';

import { useState, useMemo } from 'react';
import { DashboardApplication, DashboardRole } from '@/types/loan-application';
import { generateDashboardApplications } from '@/lib/mock-dashboard-data';

function workingDaysBetween(isoDate: string): number {
  const start = new Date(isoDate);
  const end = new Date();
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  if (end < start) return 0;

  let count = 0;
  const cur = new Date(start);
  while (cur <= end) {
    const d = cur.getDay();
    if (d !== 0 && d !== 6) count++; // Skip weekends
    cur.setDate(cur.getDate() + 1);
  }
  return Math.max(0, count - 1);
}

function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
}

export default function DashboardPage() {
  // Mock role - in production this would come from session/auth
  const [currentRole] = useState<DashboardRole>('admin');
  const [currentUser] = useState('Admin LinKUR');

  // Generate data once
  const [allData] = useState<DashboardApplication[]>(() => generateDashboardApplications(128));

  // Filters
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [regionalFilter, setRegionalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showOnProcess, setShowOnProcess] = useState(true);
  const [showOverSLA, setShowOverSLA] = useState(false);

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = allData.length;
    const onProcess = allData.filter((app) => app.currentStep !== 'approved' && app.currentStep !== 'rejected' && app.currentStep !== 'pencairan').length;
    const overSLA = allData.filter((app) => workingDaysBetween(app.submittedAt) > 3).length;
    const approved = allData.filter((app) => app.currentStep === 'approved' || app.currentStep === 'pencairan').length;
    const rejected = allData.filter((app) => app.currentStep === 'rejected').length;

    const totalPlafon = allData.reduce((sum, app) => sum + app.plafon, 0);
    const approvedPlafon = allData
      .filter((app) => app.currentStep === 'approved' || app.currentStep === 'pencairan')
      .reduce((sum, app) => sum + app.plafon, 0);

    return { total, onProcess, overSLA, approved, rejected, totalPlafon, approvedPlafon };
  }, [allData]);

  // Get unique cities, regionals, and statuses
  const cities = useMemo(() => Array.from(new Set(allData.map((d) => d.city))).sort(), [allData]);
  const regionals = useMemo(() => Array.from(new Set(allData.map((d) => d.regional))).sort(), [allData]);
  const statuses = useMemo(
    () => [
      { value: 'prescreening', label: 'Prescreening' },
      { value: 'submitted', label: 'Submitted' },
      { value: 'in_review', label: 'In Review' },
      { value: 'kunjungan', label: 'Kunjungan' },
      { value: 'approved', label: 'Approved' },
      { value: 'rejected', label: 'Rejected' },
      { value: 'pencairan', label: 'Pencairan' },
    ],
    []
  );

  // Filter data
  const filteredData = useMemo(() => {
    return allData.filter((app) => {
      // City filter
      if (cityFilter && app.city !== cityFilter) return false;

      // Regional filter
      if (regionalFilter && app.regional !== regionalFilter) return false;

      // Status filter
      if (statusFilter && app.currentStep !== statusFilter) return false;

      // Search filter
      if (search) {
        const q = search.toLowerCase();
        const matchesSearch =
          app.id.toLowerCase().includes(q) ||
          app.cif.toLowerCase().includes(q) ||
          app.borrower.toLowerCase().includes(q) ||
          app.city.toLowerCase().includes(q) ||
          app.namaUsaha.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Metric filters
      if (!showOnProcess && !showOverSLA) return true;

      const isOnProcess = app.currentStep !== 'approved' && app.currentStep !== 'rejected' && app.currentStep !== 'pencairan';
      const isOverSLA = workingDaysBetween(app.submittedAt) > 3;

      if (showOnProcess && isOnProcess) return true;
      if (showOverSLA && isOverSLA) return true;

      return false;
    });
  }, [allData, cityFilter, regionalFilter, statusFilter, search, showOnProcess, showOverSLA]);

  // Download CSV
  const downloadCSV = () => {
    if (filteredData.length === 0) {
      alert('Tidak ada data untuk didownload.');
      return;
    }

    const rows = filteredData.map((r) => ({
      'ID Pengajuan': r.id,
      CIF: r.cif,
      'Nama Nasabah': r.borrower,
      'Nomor KTP': r.nomorKTP,
      'Nomor HP': r.nomorHP,
      Email: r.email,
      'Kota/Kabupaten': r.city,
      'Regional Office': r.regional,
      'Nama Usaha': r.namaUsaha,
      'Jenis Usaha': r.jenisUsaha,
      'Plafon (Rp)': r.plafon,
      'Jenis Pinjaman': r.loanType,
      'Tanggal Pengajuan': new Date(r.submittedAt).toLocaleDateString('id-ID'),
      'Status Saat Ini': r.currentStep,
      'Jumlah Hari Kerja': workingDaysBetween(r.submittedAt),
      'Assigned To': r.assignedTo || '-',
    }));

    const keys = Object.keys(rows[0]);
    const csvContent = [
      keys.join(','),
      ...rows.map((row) => keys.map((k) => `"${String(row[k as keyof typeof row]).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const parts = [];
    if (showOnProcess) parts.push('onprocess');
    if (showOverSLA) parts.push('over-sla');
    const filterName = parts.length ? `${parts.join('_')}` : 'all';
    const cityName = cityFilter ? `-${cityFilter.replace(/\s+/g, '_')}` : '';
    const statusName = statusFilter ? `-${statusFilter}` : '';

    link.href = url;
    link.download = `linkur-monitoring-${filterName}${cityName}${statusName}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-primary">LinKUR Dashboard</h1>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {currentRole.toUpperCase()}
              </span>
              <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground ml-2 pl-3 border-l border-border">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-foreground font-medium">{currentUser}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/dashboard/analytics"
                className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="hidden sm:inline">Analytics</span>
              </a>
              <a
                href="/"
                className="text-sm text-secondary hover:text-primary font-medium transition-colors"
              >
                Beranda
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Pengajuan */}
          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">Total Pengajuan</div>
              <svg
                className="w-8 h-8 text-primary/20"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-3xl font-bold text-foreground">{metrics.total}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Total plafon: {formatIDR(metrics.totalPlafon)}
            </div>
          </div>

          {/* On Process - Clickable */}
          <label className="bg-card rounded-lg shadow-lg p-6 border-2 border-border hover:border-primary transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">Total On Process</div>
              <input
                type="checkbox"
                checked={showOnProcess}
                onChange={(e) => setShowOnProcess(e.target.checked)}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
              />
            </div>
            <div className="text-3xl font-bold text-warning">{metrics.onProcess}</div>
            <div className="text-xs text-muted-foreground mt-1">Belum selesai proses</div>
          </label>

          {/* Over SLA - Clickable */}
          <label className="bg-card rounded-lg shadow-lg p-6 border-2 border-border hover:border-error transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">Melebihi SLA</div>
              <input
                type="checkbox"
                checked={showOverSLA}
                onChange={(e) => setShowOverSLA(e.target.checked)}
                className="w-5 h-5 text-error border-gray-300 rounded focus:ring-error"
              />
            </div>
            <div className="text-3xl font-bold text-error">{metrics.overSLA}</div>
            <div className="text-xs text-muted-foreground mt-1">&gt; 3 hari kerja</div>
          </label>

          {/* Approved */}
          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">Disetujui</div>
              <svg
                className="w-8 h-8 text-success/20"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-3xl font-bold text-success">{metrics.approved}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Plafon: {formatIDR(metrics.approvedPlafon)}
            </div>
          </div>
        </div>

        {/* Analytics Notice for Admin */}
        <div className="mb-8 bg-gray-50 rounded-2xl shadow-lg p-8 border-2 border-dashed border-gray-300">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Lihat Analytics & Reports
            </h3>
            <p className="text-secondary mb-6">
              Dashboard analytics lengkap dengan visualisasi data dan trend pengajuan
            </p>
            <a
              href="/dashboard/analytics"
              className="px-8 py-3 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2 text-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 4 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Buka Analytics Dashboard
            </a>
            <p className="text-xs text-muted-foreground mt-4">
              Visualisasi line chart untuk trend pengajuan harian, distribusi status, dan laporan regional
            </p>
          </div>
        </div>

        {/* Filters and Table */}
        <div className="bg-card rounded-lg shadow-lg border border-border">
          {/* Filter Bar */}
          <div className="p-6 border-b border-border">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Daftar Pengajuan</h2>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari ID, CIF, nama, kota, usaha..."
                  className="px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none flex-1 lg:w-64"
                />
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                >
                  <option value="">Semua Kota/Kabupaten</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <select
                  value={regionalFilter}
                  onChange={(e) => setRegionalFilter(e.target.value)}
                  className="px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                >
                  <option value="">Semua Regional</option>
                  {regionals.map((regional) => (
                    <option key={regional} value={regional}>
                      {regional}
                    </option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                >
                  <option value="">Semua Status</option>
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={downloadCSV}
                  className="px-4 py-2 bg-primary hover:bg-primary-600 text-primary-foreground rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Download CSV ({filteredData.length})
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/30 text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">CIF</th>
                  <th className="p-4 font-semibold">Nama Nasabah</th>
                  <th className="p-4 font-semibold">Nama Usaha</th>
                  <th className="p-4 font-semibold">Kota</th>
                  <th className="p-4 font-semibold">Regional</th>
                  <th className="p-4 font-semibold">Plafon</th>
                  <th className="p-4 font-semibold">Tanggal</th>
                  <th className="p-4 font-semibold">Hari Kerja</th>
                  <th className="p-4 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-muted-foreground">
                      Tidak ada data yang sesuai dengan filter
                    </td>
                  </tr>
                ) : (
                  filteredData.map((app) => {
                    const daysWorking = workingDaysBetween(app.submittedAt);
                    const isOverSLA = daysWorking > 3;

                    return (
                      <tr
                        key={app.id}
                        className={`border-b border-border hover:bg-muted/20 transition-colors ${
                          isOverSLA ? 'bg-error/5' : ''
                        }`}
                      >
                        <td className="p-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              app.currentStep === 'approved' || app.currentStep === 'pencairan'
                                ? 'bg-success/10 text-success'
                                : app.currentStep === 'rejected'
                                ? 'bg-error/10 text-error'
                                : 'bg-warning/10 text-warning'
                            }`}
                          >
                            {app.currentStep}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-xs">{app.cif}</td>
                        <td className="p-4 font-medium">{app.borrower}</td>
                        <td className="p-4 text-muted-foreground">{app.namaUsaha}</td>
                        <td className="p-4">{app.city}</td>
                        <td className="p-4 text-muted-foreground">{app.regional}</td>
                        <td className="p-4 font-semibold">{formatIDR(app.plafon)}</td>
                        <td className="p-4 text-muted-foreground">
                          {new Date(app.submittedAt).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="p-4">
                          <span
                            className={`font-medium ${
                              isOverSLA ? 'text-error' : 'text-foreground'
                            }`}
                          >
                            {daysWorking} hari
                          </span>
                        </td>
                        <td className="p-4">
                          <a
                            href={`/dashboard/${app.id}`}
                            className="text-primary hover:text-primary-600 font-medium hover:underline"
                          >
                            Detail
                          </a>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 border-t border-border bg-muted/20">
            <div className="text-sm text-muted-foreground">
              Menampilkan <span className="font-semibold text-foreground">{filteredData.length}</span>{' '}
              dari <span className="font-semibold text-foreground">{metrics.total}</span> pengajuan
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm text-foreground">
              <strong>Catatan:</strong> Data yang ditampilkan adalah monitoring tindak lanjut untuk
              Kantor Pusat. SLA standar adalah 3 hari kerja sejak pengajuan disubmit. Pengajuan yang
              melebihi SLA akan ditandai dengan warna merah. Download CSV untuk tindak lanjut ke
              Regional Office.
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border mt-12">
        © {new Date().getFullYear()} LinKUR — Dashboard Monitoring Internal
      </footer>
    </div>
  );
}
