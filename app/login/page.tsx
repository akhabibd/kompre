'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<'admin' | 'user' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoAdmin = () => {
    // Demo admin login
    router.push('/dashboard');
  };

  const handleDemoUser = () => {
    // Demo user login
    router.push('/ajukan-pinjaman');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginType === 'admin') {
      router.push('/dashboard');
    } else {
      router.push('/ajukan-pinjaman');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary mb-3">LinKUR</h1>
          <p className="text-xl text-secondary">Platform Kredit Usaha Rakyat</p>
          <p className="text-sm text-muted-foreground mt-2">Powered by BRI</p>
        </div>

        {/* Login Options */}
        {!loginType ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Admin Login */}
            <div className="bg-card rounded-2xl shadow-2xl border border-border p-8 hover:shadow-3xl transition-shadow">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
                  <svg
                    className="w-10 h-10 text-primary"
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
                <h2 className="text-2xl font-bold text-foreground mb-2">Admin / Staff</h2>
                <p className="text-sm text-muted-foreground">
                  Dashboard monitoring & analytics
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setLoginType('admin')}
                  className="w-full py-3 px-6 bg-primary hover:bg-primary-600 text-primary-foreground rounded-lg font-semibold transition-colors"
                >
                  Login sebagai Admin
                </button>
                <button
                  onClick={handleDemoAdmin}
                  className="w-full py-3 px-6 border-2 border-primary text-primary hover:bg-primary/5 rounded-lg font-semibold transition-colors"
                >
                  Demo Admin
                </button>
              </div>

              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Akses untuk:</strong> Admin, Analyst, Staff BRI & LinKUR
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Fitur: Monitoring pengajuan, Analytics, Reports, Manage status
                </p>
              </div>
            </div>

            {/* User Login */}
            <div className="bg-card rounded-2xl shadow-2xl border border-border p-8 hover:shadow-3xl transition-shadow">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-4">
                  <svg
                    className="w-10 h-10 text-success"
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
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Nasabah / UMKM</h2>
                <p className="text-sm text-muted-foreground">
                  Ajukan pinjaman KUR Mikro
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setLoginType('user')}
                  className="w-full py-3 px-6 bg-success hover:bg-success/90 text-white rounded-lg font-semibold transition-colors"
                >
                  Login sebagai Nasabah
                </button>
                <button
                  onClick={handleDemoUser}
                  className="w-full py-3 px-6 border-2 border-success text-success hover:bg-success/5 rounded-lg font-semibold transition-colors"
                >
                  Demo Nasabah
                </button>
              </div>

              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Akses untuk:</strong> Pelaku UMKM yang ingin mengajukan KUR
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Fitur: Ajukan pinjaman, Upload dokumen, Cek status pengajuan
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-card rounded-2xl shadow-2xl border border-border p-8">
            <button
              onClick={() => setLoginType(null)}
              className="mb-6 text-secondary hover:text-foreground transition-colors flex items-center gap-2"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Kembali
            </button>

            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  loginType === 'admin' ? 'bg-primary/10' : 'bg-success/10'
                }`}
              >
                <svg
                  className={`w-8 h-8 ${loginType === 'admin' ? 'text-primary' : 'text-success'}`}
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
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Login {loginType === 'admin' ? 'Admin' : 'Nasabah'}
              </h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={loginType === 'admin' ? 'admin@linkur.com' : 'nasabah@email.com'}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  loginType === 'admin'
                    ? 'bg-primary hover:bg-primary-600 text-primary-foreground'
                    : 'bg-success hover:bg-success/90 text-white'
                }`}
              >
                Login
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Demo mode: Username & password bebas, langsung bisa login
              </p>
            </form>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 LinKUR x BRI. Platform Kredit Usaha Rakyat Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
}
