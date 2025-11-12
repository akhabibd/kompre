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

  const handleDemoFill = () => {
    setFormData({
      phoneNumber: '08123456789',
      verificationCode: '123456',
      isVerified: true,
      acceptedTerms: true,
    });
    setOtpSent(true);
    alert('Demo: Nomor HP otomatis terverifikasi!');
  };

  const handleSendOTP = () => {
    if (formData.phoneNumber.length >= 10) {
      setOtpSent(true);
      alert('Kode verifikasi telah dikirim ke nomor ' + formData.phoneNumber);
    }
  };

  const handleVerify = () => {
    if (formData.verificationCode === '1234' || formData.verificationCode === '123456') {
      setFormData({ ...formData, isVerified: true });
      alert('Nomor HP berhasil diverifikasi!');
    } else {
      alert('Kode verifikasi salah!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.isVerified) {
      onNext(formData);
    }
  };

  const isValid = formData.isVerified;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Demo Button */}
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={handleDemoFill}
          className="px-4 py-2 bg-success hover:bg-success/90 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Demo Auto-Fill
        </button>
      </div>

      <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Verifikasi Nomor HP
        </h2>
        <p className="text-secondary mb-8">
          Verifikasi nomor handphone Anda untuk melanjutkan pengajuan Kredit Usaha Rakyat
        </p>

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
