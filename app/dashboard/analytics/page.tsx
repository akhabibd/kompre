'use client';

import { useState, useMemo } from 'react';
import { DashboardApplication } from '@/types/loan-application';
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
    if (d !== 0 && d !== 6) count++;
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

export default function AnalyticsPage() {
  // Exclude prescreening (not yet submitted applications)
  const [allData] = useState<DashboardApplication[]>(() =>
    generateDashboardApplications(128).filter(app => app.currentStep !== 'prescreening')
  );
  const [timeRange, setTimeRange] = useState<'7' | '14' | '30'>('30');

  // Filter data by time range
  const filteredByTime = useMemo(() => {
    const daysAgo = parseInt(timeRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
    return allData.filter((app) => new Date(app.submittedAt) >= cutoffDate);
  }, [allData, timeRange]);

  // Status Distribution
  const statusDistribution = useMemo(() => {
    const dist = filteredByTime.reduce((acc, app) => {
      acc[app.currentStep] = (acc[app.currentStep] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(dist).reduce((sum, count) => sum + count, 0);
    return Object.entries(dist).map(([status, count]) => ({
      status,
      count,
      percentage: ((count / total) * 100).toFixed(1),
    }));
  }, [filteredByTime]);

  // Regional Distribution
  const regionalDistribution = useMemo(() => {
    const dist = filteredByTime.reduce((acc, app) => {
      if (!acc[app.regional]) {
        acc[app.regional] = { count: 0, plafon: 0 };
      }
      acc[app.regional].count += 1;
      acc[app.regional].plafon += app.plafon;
      return acc;
    }, {} as Record<string, { count: number; plafon: number }>);

    return Object.entries(dist)
      .map(([regional, data]) => ({
        regional,
        count: data.count,
        plafon: data.plafon,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10
  }, [filteredByTime]);

  // Loan Type Distribution
  const loanTypeDistribution = useMemo(() => {
    const dist = filteredByTime.reduce((acc, app) => {
      acc[app.loanType] = (acc[app.loanType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(dist).map(([type, count]) => ({
      type,
      count,
    }));
  }, [filteredByTime]);

  // Processing Time Stats
  const processingTimeStats = useMemo(() => {
    const times = filteredByTime.map((app) => workingDaysBetween(app.submittedAt));
    const avg = times.reduce((sum, t) => sum + t, 0) / times.length;
    const max = Math.max(...times);
    const min = Math.min(...times);
    const overSLA = times.filter((t) => t > 3).length;

    return {
      average: avg.toFixed(1),
      max,
      min,
      overSLA,
      overSLAPercentage: ((overSLA / times.length) * 100).toFixed(1),
    };
  }, [filteredByTime]);

  // Daily Trend (last 14 days)
  const dailyTrend = useMemo(() => {
    const days = 14;
    const trend: { date: string; count: number }[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const count = allData.filter((app) => {
        const appDate = new Date(app.submittedAt).toISOString().split('T')[0];
        return appDate === dateStr;
      }).length;

      trend.push({
        date: date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
        count,
      });
    }

    return trend;
  }, [allData]);

  const maxDailyCount = Math.max(...dailyTrend.map((d) => d.count), 1);

  // Color mapping for status
  const statusColors: Record<string, string> = {
    submitted: '#60a5fa', // blue
    review_dokumen: '#a78bfa', // purple
    kunjungan_pemasar: '#fb923c', // orange
    approved: '#34d399', // success/green
    rejected: '#f87171', // error/red
    pencairan: '#10b981', // green
  };

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
                <h1 className="text-2xl font-bold text-primary">Analytics & Reports</h1>
                <p className="text-sm text-muted-foreground">
                  Data analytics untuk {filteredByTime.length} pengajuan
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as '7' | '14' | '30')}
                className="px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none text-sm"
              >
                <option value="7">7 Hari Terakhir</option>
                <option value="14">14 Hari Terakhir</option>
                <option value="30">30 Hari Terakhir</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
            <div className="text-sm font-medium text-muted-foreground">Avg. Processing Time</div>
            <div className="text-3xl font-bold text-primary mt-2">
              {processingTimeStats.average} <span className="text-lg">hari</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Min: {processingTimeStats.min} | Max: {processingTimeStats.max}
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
            <div className="text-sm font-medium text-muted-foreground">Over SLA Rate</div>
            <div className="text-3xl font-bold text-error mt-2">
              {processingTimeStats.overSLAPercentage}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {processingTimeStats.overSLA} dari {filteredByTime.length} pengajuan
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
            <div className="text-sm font-medium text-muted-foreground">Total Plafon</div>
            <div className="text-2xl font-bold text-success mt-2">
              {formatIDR(filteredByTime.reduce((sum, app) => sum + app.plafon, 0))}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Semua pengajuan</div>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
            <div className="text-sm font-medium text-muted-foreground">Avg. Plafon</div>
            <div className="text-2xl font-bold text-foreground mt-2">
              {formatIDR(
                filteredByTime.reduce((sum, app) => sum + app.plafon, 0) / filteredByTime.length
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Per pengajuan</div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6">Distribusi Status Pengajuan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statusDistribution.map((item) => (
              <div key={item.status} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {item.status}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full h-3 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: statusColors[item.status] || '#6b7280',
                    }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">{item.count} pengajuan</div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-foreground">
              <strong>Jenis Pinjaman:</strong> Semua pengajuan adalah <strong>KUR Mikro</strong> - Kredit Usaha Rakyat untuk UMKM dengan plafon hingga Rp 100 juta.
            </p>
          </div>
        </div>

        {/* Daily Trend Chart - LINE CHART */}
        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Trend Pengajuan (14 Hari Terakhir) - Line Chart
          </h3>
          <div className="relative h-80">
            {(() => {
              const chartHeight = 280;
              const chartWidth = 100; // percentage
              const padding = { top: 20, bottom: 40, left: 50, right: 20 };

              // Dynamic Y-axis calculation
              const counts = dailyTrend.map(d => d.count);
              const minCount = Math.min(...counts);
              const maxCount = Math.max(...counts);
              const range = maxCount - minCount;
              const yMin = Math.max(0, minCount - range * 0.2); // 20% padding below
              const yMax = maxCount + range * 0.2; // 20% padding above
              const yRange = yMax - yMin || 1;

              // Calculate points for line
              const points = dailyTrend.map((day, idx) => {
                const x = (idx / (dailyTrend.length - 1)) * 100;
                const y = ((yMax - day.count) / yRange) * 100;
                return { x, y, count: day.count, date: day.date };
              });

              // Create path string
              const pathString = points.map((p, i) =>
                `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
              ).join(' ');

              // Y-axis labels (5 levels)
              const yLabels = Array.from({ length: 5 }, (_, i) => {
                const value = yMax - (yRange * i / 4);
                return Math.round(value);
              });

              return (
                <>
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-10 w-12 flex flex-col justify-between text-xs text-muted-foreground">
                    {yLabels.map((label, i) => (
                      <div key={i} className="text-right pr-2">{label}</div>
                    ))}
                  </div>

                  {/* Chart area */}
                  <div className="absolute left-12 right-0 top-0 bottom-10 border-l border-b border-border">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Horizontal grid lines */}
                      {[0, 25, 50, 75, 100].map(y => (
                        <line
                          key={y}
                          x1="0"
                          y1={y}
                          x2="100"
                          y2={y}
                          stroke="currentColor"
                          strokeWidth="0.2"
                          className="text-border"
                          opacity="0.3"
                        />
                      ))}

                      {/* Line chart */}
                      <polyline
                        points={points.map(p => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke="#0070c0"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />

                      {/* Area under line (optional gradient fill) */}
                      <polygon
                        points={`0,100 ${points.map(p => `${p.x},${p.y}`).join(' ')} 100,100`}
                        fill="#0070c0"
                        opacity="0.1"
                      />

                      {/* Data points */}
                      {points.map((p, i) => (
                        <g key={i}>
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r="1.5"
                            fill="#0070c0"
                            vectorEffect="non-scaling-stroke"
                            className="hover:r-2 transition-all cursor-pointer"
                          />
                          <title>{p.count} pengajuan - {p.date}</title>
                        </g>
                      ))}
                    </svg>

                    {/* Hover points for better UX */}
                    <div className="absolute inset-0 flex items-stretch">
                      {points.map((p, i) => (
                        <div
                          key={i}
                          className="flex-1 hover:bg-primary/5 cursor-pointer group relative"
                          title={`${p.count} pengajuan`}
                        >
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                            {p.count} pengajuan
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* X-axis labels */}
                  <div className="absolute left-12 right-0 bottom-0 h-10 flex items-center justify-between">
                    {dailyTrend.map((day, i) => (
                      <div
                        key={i}
                        className="text-xs text-muted-foreground -rotate-45 origin-top-left"
                        style={{ transform: 'rotate(-45deg) translateY(8px)' }}
                      >
                        {day.date}
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* Top Regional Offices */}
        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Top 10 Regional Office (by Volume)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/30 text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-3 font-semibold">Rank</th>
                  <th className="p-3 font-semibold">Regional Office</th>
                  <th className="p-3 font-semibold">Jumlah Pengajuan</th>
                  <th className="p-3 font-semibold">Total Plafon</th>
                  <th className="p-3 font-semibold">Avg. Plafon</th>
                </tr>
              </thead>
              <tbody>
                {regionalDistribution.map((item, idx) => (
                  <tr key={item.regional} className="border-b border-border hover:bg-muted/20">
                    <td className="p-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          idx === 0
                            ? 'bg-warning/20 text-warning'
                            : idx === 1
                            ? 'bg-muted-foreground/20 text-muted-foreground'
                            : idx === 2
                            ? 'bg-error/20 text-error'
                            : 'bg-muted/30 text-foreground'
                        }`}
                      >
                        {idx + 1}
                      </div>
                    </td>
                    <td className="p-3 font-semibold text-foreground">{item.regional}</td>
                    <td className="p-3">{item.count} pengajuan</td>
                    <td className="p-3 font-semibold">{formatIDR(item.plafon)}</td>
                    <td className="p-3 text-muted-foreground">
                      {formatIDR(item.plafon / item.count)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Note */}
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
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
              <strong>Catatan:</strong> Data analytics ini diperbarui secara real-time berdasarkan
              pengajuan yang masuk. Gunakan filter time range untuk melihat trend dalam periode
              tertentu. Export data dari halaman utama dashboard untuk analisis lebih lanjut.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
