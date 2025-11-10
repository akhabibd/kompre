'use client';

import { useState } from 'react';
import { DataLinkUMKM as DataLinkUMKMType } from '@/types/loan-application';

interface DataLinkUMKMProps {
  data: DataLinkUMKMType;
  onNext: (data: DataLinkUMKMType) => void;
  onBack: () => void;
}

export default function DataLinkUMKM({ data, onNext, onBack }: DataLinkUMKMProps) {
  const [formData, setFormData] = useState<DataLinkUMKMType>(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.confirmed && formData.syncData) {
      onNext(formData);
    }
  };

  // Mock data from LinkUMKM - in production this would come from API
  const mockLinkUMKMData = {
    nama: 'John Doe',
    email: 'john.doe@email.com',
    nomorHP: '081234567890',
    alamat: 'Jl. Contoh No. 123, Jakarta',
    tanggalBergabung: '15 Januari 2023',
  };

  const isValid = formData.confirmed && formData.syncData;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Konfirmasi Data LinkUMKM
        </h2>
        <p className="text-secondary mb-6">
          Pastikan data Anda dari LinkUMKM sudah benar
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data from LinkUMKM */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-sm font-medium text-secondary">Nama</span>
              <span className="text-foreground font-medium">{mockLinkUMKMData.nama}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-sm font-medium text-secondary">Email</span>
              <span className="text-foreground font-medium">{mockLinkUMKMData.email}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-sm font-medium text-secondary">Nomor HP</span>
              <span className="text-foreground font-medium">
                {mockLinkUMKMData.nomorHP}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-sm font-medium text-secondary">Alamat</span>
              <span className="text-foreground font-medium text-right max-w-xs">
                {mockLinkUMKMData.alamat}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-secondary">Tanggal Bergabung</span>
              <span className="text-foreground font-medium">
                {mockLinkUMKMData.tanggalBergabung}
              </span>
            </div>
          </div>

          {/* Confirmation Checkboxes */}
          <div className="space-y-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={formData.confirmed}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmed: e.target.checked })
                  }
                  className="w-5 h-5 mt-0.5 border-2 border-gray-300 rounded appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-colors"
                />
                {formData.confirmed && (
                  <svg
                    className="absolute w-3 h-3 text-white pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-foreground">
                Saya konfirmasi bahwa data di atas sudah benar
              </span>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={formData.syncData}
                  onChange={(e) => setFormData({ ...formData, syncData: e.target.checked })}
                  className="w-5 h-5 mt-0.5 border-2 border-gray-300 rounded appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-colors"
                />
                {formData.syncData && (
                  <svg
                    className="absolute w-3 h-3 text-white pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-foreground">
                Sinkronisasi data LinkUMKM untuk pengajuan pinjaman
              </span>
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-3 px-6 border border-gray-300 rounded-lg font-medium text-foreground hover:bg-gray-50 transition-colors"
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                isValid
                  ? 'bg-primary hover:bg-primary-600 text-white cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Lanjutkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
