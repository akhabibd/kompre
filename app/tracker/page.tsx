'use client';

import { useState } from 'react';
import { TrackerStatus, UserProfile } from '@/types/loan-application';
import Sidebar from '@/components/ajukan-pinjaman/Sidebar';

export default function TrackerPage() {
  // Mock user profile - in production this would come from session/API
  const userProfile: UserProfile = {
    name: 'Budi Santoso',
    phone: '08123456789',
    email: 'budi.santoso@email.com',
  };

  // Mock data - in production this would come from API/database
  const [trackerData] = useState<TrackerStatus[]>([
    {
      step: 'prescreening',
      date: '10 Nov 2025, 10:30',
      notes: 'Prescreening berhasil diselesaikan',
    },
    {
      step: 'submitted',
      date: '10 Nov 2025, 11:15',
      notes: 'Pengajuan telah diterima dan sedang diproses',
    },
    {
      step: 'in_review',
      date: '11 Nov 2025, 09:00',
      notes: 'Tim sedang melakukan review dokumen',
    },
    {
      step: 'kunjungan',
      date: '',
      notes: '',
    },
    {
      step: 'approved',
      date: '',
      notes: '',
    },
    {
      step: 'pencairan',
      date: '',
      notes: '',
    },
  ]);

  const currentStepIndex = trackerData.findIndex((item) => !item.date);

  const getStepLabel = (step: TrackerStatus['step']) => {
    const labels = {
      prescreening: 'Prescreening',
      submitted: 'Submitted',
      in_review: 'In Review',
      kunjungan: 'Kunjungan Tenaga Pemasar',
      approved: 'Approved',
      rejected: 'Rejected',
      pencairan: 'Pencairan',
    };
    return labels[step];
  };

  const getStepStatus = (index: number) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">LinKUR</h1>
            <a
              href="/"
              className="text-sm text-secondary hover:text-foreground transition-colors"
            >
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Left */}
          <div className="lg:col-span-1">
            <Sidebar user={userProfile} />
          </div>

          {/* Main Tracker - Right */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
              <h2 className="text-3xl font-bold text-foreground mb-2">Status Pengajuan</h2>
              <p className="text-secondary mb-8">
                Pantau perkembangan pengajuan pembiayaan Anda
              </p>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {trackerData.map((item, index) => {
                const status = getStepStatus(index);
                return (
                  <div key={item.step} className="relative flex items-start">
                    {/* Circle Indicator */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          status === 'completed'
                            ? 'bg-success'
                            : status === 'current'
                            ? 'bg-primary animate-pulse'
                            : 'bg-gray-200'
                        }`}
                      >
                        {status === 'completed' ? (
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : status === 'current' ? (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="ml-6 flex-1">
                      <div
                        className={`p-4 rounded-lg ${
                          status === 'completed'
                            ? 'bg-success/10 border border-success'
                            : status === 'current'
                            ? 'bg-primary/10 border border-primary'
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <h3
                          className={`font-semibold mb-1 ${
                            status === 'pending' ? 'text-secondary' : 'text-foreground'
                          }`}
                        >
                          {getStepLabel(item.step)}
                        </h3>
                        {item.date && (
                          <p className="text-sm text-secondary mb-1">{item.date}</p>
                        )}
                        {item.notes && (
                          <p className="text-sm text-foreground">{item.notes}</p>
                        )}
                        {status === 'current' && (
                          <div className="mt-2">
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                              <span className="text-sm text-primary font-medium">
                                Sedang diproses...
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

              <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>Catatan:</strong> Proses pengajuan memerlukan waktu 3-5 hari kerja.
                  Anda akan dihubungi oleh tenaga pemasar kami untuk proses selanjutnya.
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-3 px-6 bg-primary hover:bg-primary-600 text-primary-foreground rounded-lg font-medium transition-colors"
                >
                  Refresh Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
