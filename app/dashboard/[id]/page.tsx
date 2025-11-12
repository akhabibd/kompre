'use client';

import { useState, useMemo } from 'react';
import { use } from 'react';
import { DashboardApplication } from '@/types/loan-application';
import { generateDashboardApplications } from '@/lib/mock-dashboard-data';

function formatIDR(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(num);
}

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const appId = resolvedParams.id;

  // Generate data and find the application
  const [allData] = useState<DashboardApplication[]>(() => generateDashboardApplications(128));
  const application = useMemo(() => allData.find((app) => app.id === appId), [allData, appId]);

  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<string[]>(application?.notes || []);

  if (!application) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Pengajuan Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-4">
            ID {appId} tidak ditemukan dalam sistem
          </p>
          <a
            href="/dashboard"
            className="text-primary hover:text-primary-600 font-medium hover:underline"
          >
            Kembali ke Dashboard
          </a>
        </div>
      </div>
    );
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      const timestamp = new Date().toLocaleString('id-ID');
      setNotes([...notes, `[${timestamp}] ${newNote.trim()}`]);
      setNewNote('');
      setShowAddNoteModal(false);
      alert('Catatan berhasil ditambahkan!');
    }
  };

  const { fullData } = application;
  const { prescreening, dataBisnis } = fullData;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/dashboard"
                className="text-secondary hover:text-foreground transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </a>
              <div>
                <h1 className="text-xl font-bold text-primary">Detail Pengajuan</h1>
                <p className="text-sm text-muted-foreground">ID: {application.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  application.currentStep === 'approved' || application.currentStep === 'pencairan'
                    ? 'bg-success/10 text-success'
                    : application.currentStep === 'rejected'
                    ? 'bg-error/10 text-error'
                    : 'bg-warning/10 text-warning'
                }`}
              >
                {application.currentStep.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Overview Pengajuan
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">CIF</p>
                  <p className="text-base font-semibold text-foreground font-mono">
                    {application.cif}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Jenis Pinjaman</p>
                  <p className="text-base font-semibold text-foreground">{application.loanType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Plafon Pengajuan</p>
                  <p className="text-base font-semibold text-primary">
                    {formatIDR(application.plafon)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tanggal Pengajuan</p>
                  <p className="text-base font-semibold text-foreground">
                    {new Date(application.submittedAt).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kota/Kabupaten</p>
                  <p className="text-base font-semibold text-foreground">{application.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Regional Office</p>
                  <p className="text-base font-semibold text-foreground">{application.regional}</p>
                </div>
              </div>
            </div>

            {/* Profil Nasabah */}
            <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
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
                Data Pribadi Nasabah
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                  <p className="text-base font-semibold text-foreground">
                    {prescreening.profilNasabah.namaLengkap}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nomor KTP</p>
                  <p className="text-base font-semibold text-foreground font-mono">
                    {prescreening.profilNasabah.nomorKTP}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                  <p className="text-base font-semibold text-foreground capitalize">
                    {prescreening.profilNasabah.jenisKelamin}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tempat, Tanggal Lahir</p>
                  <p className="text-base font-semibold text-foreground">
                    {prescreening.profilNasabah.tempatLahir},{' '}
                    {new Date(prescreening.profilNasabah.tanggalLahir).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nomor HP</p>
                  <p className="text-base font-semibold text-foreground">
                    {prescreening.profilNasabah.nomorHP}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-base font-semibold text-foreground">
                    {prescreening.profilNasabah.email}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Alamat KTP</p>
                  <p className="text-base font-semibold text-foreground">
                    {prescreening.profilNasabah.alamatKTP}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nomor KK</p>
                  <p className="text-base font-semibold text-foreground font-mono">
                    {prescreening.profilNasabah.nomorKK}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nomor NPWP</p>
                  <p className="text-base font-semibold text-foreground font-mono">
                    {prescreening.profilNasabah.nomorNPWP}
                  </p>
                </div>
              </div>
            </div>

            {/* Data Bisnis */}
            <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Data Bisnis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nama Usaha</p>
                  <p className="text-base font-semibold text-foreground">{dataBisnis.namaUsaha}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Jenis Usaha</p>
                  <p className="text-base font-semibold text-foreground">{dataBisnis.jenisUsaha}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Legalitas</p>
                  <p className="text-base font-semibold text-foreground">{dataBisnis.legalitas}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lama Usaha</p>
                  <p className="text-base font-semibold text-foreground">
                    {dataBisnis.lamaUsaha} Tahun
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Omset Per Bulan</p>
                  <p className="text-base font-semibold text-foreground">
                    {formatIDR(dataBisnis.omsetPerbulan)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Jumlah Karyawan</p>
                  <p className="text-base font-semibold text-foreground">
                    {dataBisnis.jumlahKaryawan} Orang
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Alamat Usaha</p>
                  <p className="text-base font-semibold text-foreground">
                    {dataBisnis.alamatUsaha}, {dataBisnis.desa}, {dataBisnis.kotaKabupaten}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Deskripsi Usaha</p>
                  <p className="text-base font-semibold text-foreground">
                    {dataBisnis.deskripsiUsaha}
                  </p>
                </div>
              </div>
            </div>

            {/* Detail Pengajuan */}
            <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Detail Pengajuan Pembiayaan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Jumlah Pengajuan</p>
                  <p className="text-lg font-bold text-primary">
                    {formatIDR(prescreening.profilPengajuan.jumlahPengajuan)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tenor</p>
                  <p className="text-lg font-bold text-foreground">
                    {prescreening.profilPengajuan.tenor} Tahun
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Peruntukan</p>
                  <p className="text-base font-semibold text-foreground">
                    {prescreening.profilPengajuan.peruntukan}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimasi Cicilan / Bulan</p>
                  <p className="text-lg font-bold text-success">
                    {formatIDR(prescreening.profilPengajuan.estimasiCicilan)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowAddNoteModal(true)}
                  className="w-full py-2 px-4 bg-primary hover:bg-primary-600 text-primary-foreground rounded-lg font-medium transition-colors"
                >
                  Tambah Catatan
                </button>
                <button className="w-full py-2 px-4 border border-border hover:bg-muted/20 text-foreground rounded-lg font-medium transition-colors">
                  Update Status
                </button>
                <button className="w-full py-2 px-4 border border-border hover:bg-muted/20 text-foreground rounded-lg font-medium transition-colors">
                  Export PDF
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Catatan Internal</h3>
              {notes.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">Belum ada catatan</p>
              ) : (
                <div className="space-y-3">
                  {notes.map((note, idx) => (
                    <div key={idx} className="p-3 bg-muted/30 rounded-lg border border-border">
                      <p className="text-sm text-foreground">{note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Assignment */}
            {application.assignedTo && (
              <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Ditugaskan Kepada</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {application.assignedTo.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{application.assignedTo}</p>
                    <p className="text-sm text-muted-foreground">Staff</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Note Modal */}
      {showAddNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Tambah Catatan Internal</h3>
            </div>
            <div className="p-6">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Tulis catatan..."
                rows={4}
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
              />
            </div>
            <div className="p-6 border-t border-border flex gap-3">
              <button
                onClick={() => setShowAddNoteModal(false)}
                className="flex-1 py-2 px-4 border border-border hover:bg-muted/20 text-foreground rounded-lg font-medium transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleAddNote}
                className="flex-1 py-2 px-4 bg-primary hover:bg-primary-600 text-primary-foreground rounded-lg font-medium transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
