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
                href="/login"
                className="px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
              >
                Login
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
            Platform pengajuan Kredit Usaha Rakyat (KUR) Mikro melalui LinKUR dan BRI.
            Dapatkan modal usaha dengan proses yang mudah dan cepat.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Mulai Sekarang
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
              <div className="flex justify-center">
                <Link
                  href="/login"
                  className="px-8 py-3 bg-white hover:bg-gray-100 text-primary rounded-lg font-semibold transition-colors text-center"
                >
                  Login & Ajukan Sekarang
                </Link>
              </div>
            </div>
            <div className="relative h-80 md:h-full bg-primary-600">
              {/* Chart icon representing UMKM growth */}
              <div className="absolute inset-0 flex items-center justify-center text-white/30">
                <svg className="w-48 h-48" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
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
