'use client';

import { useState } from 'react';
import { PhoneVerification as PhoneVerificationType } from '@/types/loan-application';

interface PhoneVerificationProps {
  data: PhoneVerificationType;
  onNext: (data: PhoneVerificationType) => void;
}

export default function PhoneVerification({ data, onNext }: PhoneVerificationProps) {
  const [formData, setFormData] = useState<PhoneVerificationType>(data);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    if (formData.phoneNumber.length >= 10) {
      setOtpSent(true);
      // Simulate sending OTP
      alert('Kode verifikasi telah dikirim ke nomor ' + formData.phoneNumber);
    }
  };

  const handleVerify = () => {
    // Simulate verification
    if (formData.verificationCode === '1234' || formData.verificationCode === '123456') {
      setFormData({ ...formData, isVerified: true });
      alert('Nomor HP berhasil diverifikasi!');
    } else {
      alert('Kode verifikasi salah!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.isVerified && formData.acceptedTerms) {
      onNext(formData);
    }
  };

  const isValid = formData.isVerified && formData.acceptedTerms;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Webform Pengajuan KUR
        </h2>
        <p className="text-secondary mb-8">
          Sebelum mengisi formulir pengajuan Kredit Usaha Rakyat, lakukan verifikasi nomor handphone terlebih dahulu
        </p>

        {/* Syarat Pengajuan */}
        <div className="bg-muted rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Syarat Pengajuan:</h3>
          <ol className="list-decimal list-inside space-y-2 text-foreground">
            <li>Permohonan</li>
            <li>Peruntukan: Modal Kerja atau Rencana Pengembangan Usaha</li>
            <li>Lama usaha: minimal 6 bulan</li>
            <li>
              Siapkan dokumen:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>KTP-el</li>
                <li>Kartu Keluarga (KK)</li>
                <li>NPWP</li>
              </ul>
            </li>
            <li className="text-warning font-medium">
              Setiap penerimaan SMS akan dikenakan biaya. Pastikan saldo dalam keadaan cukup
            </li>
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Number Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nomor Handphone
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="08xxxxxxxxxx"
                className="flex-1 px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                disabled={otpSent}
              />
              {!otpSent && (
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={formData.phoneNumber.length < 10}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    formData.phoneNumber.length >= 10
                      ? 'bg-primary hover:bg-primary-600 text-primary-foreground'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Kirim OTP
                </button>
              )}
            </div>
          </div>

          {/* OTP Input */}
          {otpSent && !formData.isVerified && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Kode Verifikasi
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.verificationCode}
                  onChange={(e) =>
                    setFormData({ ...formData, verificationCode: e.target.value })
                  }
                  placeholder="Masukkan 6 digit kode"
                  maxLength={6}
                  className="flex-1 px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={handleVerify}
                  className="px-6 py-2 bg-primary hover:bg-primary-600 text-primary-foreground rounded-lg font-medium transition-colors"
                >
                  Verifikasi
                </button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Demo: gunakan kode <span className="font-semibold">123456</span>
              </p>
            </div>
          )}

          {/* Verified Status */}
          {formData.isVerified && (
            <div className="bg-success/10 border border-success rounded-lg p-4 flex items-center gap-3">
              <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-foreground">Nomor HP Terverifikasi</p>
                <p className="text-sm text-muted-foreground">{formData.phoneNumber}</p>
              </div>
            </div>
          )}

          {/* Terms Acceptance */}
          {formData.isVerified && (
            <label className="flex items-start space-x-3 cursor-pointer">
              <div className="relative flex items-center justify-center mt-1">
                <input
                  type="checkbox"
                  checked={formData.acceptedTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, acceptedTerms: e.target.checked })
                  }
                  className="w-5 h-5 border-2 border-input rounded appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-colors"
                />
                {formData.acceptedTerms && (
                  <svg
                    className="absolute w-3 h-3 text-primary-foreground pointer-events-none"
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
                Saya telah membaca dan menyetujui syarat pengajuan KUR dan bersedia menerima SMS notifikasi
              </span>
            </label>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                isValid
                  ? 'bg-primary hover:bg-primary-600 text-primary-foreground cursor-pointer'
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
