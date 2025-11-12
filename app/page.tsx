import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">LinKUR</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-secondary hover:text-primary font-medium transition-colors"
              >
                Dashboard Internal
              </Link>
              <Link
                href="/tracker"
                className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium text-foreground transition-colors"
              >
                Cek Status
              </Link>
              <Link
                href="/ajukan-pinjaman"
                className="px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
              >
                Ajukan Pinjaman
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Wujudkan Impian Usaha Anda
          </h1>
          <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
            Platform pengajuan Kredit Usaha Rakyat (KUR) melalui LinKUR dan BRI.
            Dapatkan modal usaha dengan proses yang mudah dan cepat.
          </p>
          <Link
            href="/ajukan-pinjaman"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Mulai Ajukan Sekarang
          </Link>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Proses Mudah
            </h3>
            <p className="text-secondary">
              Ajukan pembiayaan dengan formulir online yang mudah diisi
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Pencairan Cepat
            </h3>
            <p className="text-secondary">
              Proses persetujuan cepat dengan pencairan dalam 3-5 hari kerja
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Aman & Terpercaya</h3>
            <p className="text-secondary">
              Bekerja sama dengan BRI untuk keamanan dan kepercayaan Anda
            </p>
          </div>
        </div>

        {/* Internal Staff Section */}
        <div className="mt-20 bg-gray-50 rounded-2xl shadow-lg p-8 border-2 border-dashed border-gray-300">
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
              Akses Dashboard Internal
            </h3>
            <p className="text-secondary mb-6">
              Untuk staff BRI & LinKUR: Monitoring pengajuan, analytics, dan laporan
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                Dashboard Monitoring
              </Link>
              <Link
                href="/dashboard/analytics"
                className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary/5 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Analytics & Reports
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Dashboard ini khusus untuk internal staff. Memerlukan role: Admin, Analyst, atau Staff.
            </p>
          </div>
        </div>

        {/* CTA Section with Image */}
        <div className="mt-20 bg-gradient-to-r from-primary to-primary-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Siap Mengembangkan Usaha Anda?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Daftar sekarang dan dapatkan pembiayaan KUR untuk mengembangkan usaha UMKM Anda. Proses mudah, cepat, dan terpercaya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/ajukan-pinjaman"
                  className="px-8 py-3 bg-white hover:bg-gray-100 text-primary rounded-lg font-semibold transition-colors text-center"
                >
                  Ajukan Pinjaman Sekarang
                </Link>
                <Link
                  href="/tracker"
                  className="px-8 py-3 border-2 border-white hover:bg-white/10 text-white rounded-lg font-semibold transition-colors text-center"
                >
                  Cek Status Pengajuan
                </Link>
              </div>
            </div>
            <div className="relative h-80 md:h-full bg-primary-600">
              {/* Placeholder for image - replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center text-white/30">
                <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            © 2025 LinKUR x BRI. Platform Kredit Usaha Rakyat Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
}
