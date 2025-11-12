'use client';

import { useEffect, useState } from 'react';
import { PrescreeningResult as PrescreeningResultType, PrescreeningData } from '@/types/loan-application';

interface PrescreeningResultNewProps {
  prescreeningData: PrescreeningData;
  onNext: (result: PrescreeningResultType) => void;
}

export default function PrescreeningResultNew({ prescreeningData, onNext }: PrescreeningResultNewProps) {
  const [status, setStatus] = useState<'submitted' | 'checking' | 'done'>('submitted');
  const [result, setResult] = useState<'KUR' | 'rejected' | null>(null);

  useEffect(() => {
    // Simulate prescreening process
    const timer1 = setTimeout(() => setStatus('checking'), 2000);
    const timer2 = setTimeout(() => {
      setStatus('done');

      // Determine result based on data
      const jumlahPengajuan = parseFloat(prescreeningData.profilPengajuan.jumlahPengajuan) || 0;
      const namaLengkap = prescreeningData.profilNasabah.namaLengkap;

      // Check if rejected (over 100jt or nama contains "Rejected")
      if (jumlahPengajuan > 100000000 || namaLengkap.toLowerCase().includes('rejected')) {
        setResult('rejected');
      } else {
        setResult('KUR');
      }
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [prescreeningData]);

  const handleContinue = () => {
    if (result && result !== 'rejected') {
      onNext({ status: 'done', result });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Status Prescreening
        </h2>

        <div className="mb-8">
          <p className="text-center text-secondary mb-6">
            Tunggu beberapa menit, sistem kami sedang melakukan pengecekan data
          </p>

          {/* Status Tracker */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  status === 'submitted' || status === 'checking' || status === 'done'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {status === 'done' || status === 'checking' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <div className="w-3 h-3 bg-primary-foreground rounded-full animate-pulse" />
                )}
              </div>
              <div className="ml-4">
                <p className="font-medium text-foreground">Submitted</p>
                <p className="text-sm text-secondary">Data berhasil dikirim</p>
              </div>
            </div>

            <div className="ml-4 w-0.5 h-8 bg-border" />

            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  status === 'checking' || status === 'done'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {status === 'done' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : status === 'checking' ? (
                  <div className="w-3 h-3 bg-primary-foreground rounded-full animate-pulse" />
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                )}
              </div>
              <div className="ml-4">
                <p className="font-medium text-foreground">Pengecekan Sistem</p>
                <p className="text-sm text-secondary">
                  {status === 'checking'
                    ? 'Sedang melakukan verifikasi...'
                    : 'Menunggu proses'}
                </p>
              </div>
            </div>

            <div className="ml-4 w-0.5 h-8 bg-border" />

            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  status === 'done'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {status === 'done' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                )}
              </div>
              <div className="ml-4">
                <p className="font-medium text-foreground">Done</p>
                <p className="text-sm text-secondary">Proses selesai</p>
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        {status === 'done' && result && (
          <div className="mt-8">
            {result === 'rejected' ? (
              <div className="bg-warning/10 border border-warning rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Anda Saat Ini Belum Dapat Menerima Pinjaman
                </h3>
                <p className="text-secondary mb-4">
                  Jangan khawatir, tingkatkan kapabilitas usaha melalui pelatihan yang
                  diadakan oleh LinKUR. Petugas Pemasar Kami akan melakukan pengecekan
                  usaha secara langsung apabila anda sudah dapat menerima pinjaman.
                </p>
                <button
                  onClick={() => (window.location.href = '/')}
                  className="w-full py-3 px-6 bg-warning hover:bg-warning/90 text-white rounded-lg font-medium transition-colors"
                >
                  Kembali ke Beranda
                </button>
              </div>
            ) : (
              <div className="bg-success/10 border border-success rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Selamat! Anda Memenuhi Syarat
                </h3>
                <p className="text-secondary mb-4">
                  Berdasarkan hasil prescreening, Anda memenuhi syarat untuk pembiayaan{' '}
                  <span className="font-semibold text-primary">Kredit Usaha Rakyat (KUR)</span>
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                    KUR
                  </span>
                </div>
                <button
                  onClick={handleContinue}
                  className="w-full py-3 px-6 bg-primary hover:bg-primary-600 text-primary-foreground rounded-lg font-medium transition-colors"
                >
                  Lanjutkan Pengajuan
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
