'use client';

import { useState } from 'react';
import { SyaratUtama as SyaratUtamaType } from '@/types/loan-application';

interface SyaratUtamaProps {
  data: SyaratUtamaType;
  onNext: (data: SyaratUtamaType) => void;
}

export default function SyaratUtama({ data, onNext }: SyaratUtamaProps) {
  const [formData, setFormData] = useState<SyaratUtamaType>(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.memberLinkUMKM && formData.memilikiRekeningBRI) {
      onNext(formData);
    }
  };

  const isValid = formData.memberLinkUMKM && formData.memilikiRekeningBRI;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Syarat Utama
        </h2>
        <p className="text-secondary mb-6">
          Pastikan Anda memenuhi syarat berikut sebelum melanjutkan
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="flex items-start space-x-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={formData.memberLinkUMKM}
                  onChange={(e) =>
                    setFormData({ ...formData, memberLinkUMKM: e.target.checked })
                  }
                  className="w-5 h-5 border-2 border-gray-300 rounded appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-colors"
                />
                {formData.memberLinkUMKM && (
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
              <div className="flex-1">
                <span className="text-foreground font-medium block">
                  Member LinkUMKM
                </span>
                <span className="text-sm text-secondary">
                  Anda harus terdaftar sebagai member LinkUMKM
                </span>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={formData.memilikiRekeningBRI}
                  onChange={(e) =>
                    setFormData({ ...formData, memilikiRekeningBRI: e.target.checked })
                  }
                  className="w-5 h-5 border-2 border-gray-300 rounded appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-colors"
                />
                {formData.memilikiRekeningBRI && (
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
              <div className="flex-1">
                <span className="text-foreground font-medium block">
                  Memiliki Rekening Simpanan BRI
                </span>
                <span className="text-sm text-secondary">
                  Belum punya?{' '}
                  <a
                    href="https://bukarekening.bri.co.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-600 underline"
                  >
                    Buka rekening di sini
                  </a>
                </span>
              </div>
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                isValid
                  ? 'bg-primary hover:bg-primary-600 text-white cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Lanjutkan ke Prescreening
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
