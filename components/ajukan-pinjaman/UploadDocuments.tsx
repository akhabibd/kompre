'use client';

import { useState } from 'react';
import { UploadDocuments as UploadDocumentsType } from '@/types/loan-application';

interface UploadDocumentsProps {
  data: UploadDocumentsType;
  onNext: (data: UploadDocumentsType) => void;
  onBack: () => void;
}

export default function UploadDocuments({ data, onNext, onBack }: UploadDocumentsProps) {
  const [formData, setFormData] = useState<UploadDocumentsType>(data);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UploadDocumentsType
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext(formData);
    }
  };

  const isValid =
    formData.fileKTP &&
    formData.fileSelfieKTP &&
    formData.fileKK &&
    formData.fileNPWP &&
    formData.fileSKTU;

  const uploadFields = [
    {
      key: 'fileKTP' as keyof UploadDocumentsType,
      label: 'Upload e-KTP',
      description: 'Foto e-KTP yang jelas dan terbaca',
      accept: 'image/*,.pdf',
    },
    {
      key: 'fileSelfieKTP' as keyof UploadDocumentsType,
      label: 'Upload Selfie dengan e-KTP',
      description: 'Foto selfie memegang e-KTP dengan wajah terlihat jelas',
      accept: 'image/*',
    },
    {
      key: 'fileKK' as keyof UploadDocumentsType,
      label: 'Upload Kartu Keluarga',
      description: 'Foto KK yang jelas dan terbaca',
      accept: 'image/*,.pdf',
    },
    {
      key: 'fileNPWP' as keyof UploadDocumentsType,
      label: 'Upload NPWP',
      description: 'Foto NPWP yang jelas dan terbaca',
      accept: 'image/*,.pdf',
    },
    {
      key: 'fileSKTU' as keyof UploadDocumentsType,
      label: 'Upload SKTU / NIB',
      description: 'Surat Keterangan Tempat Usaha atau Nomor Induk Berusaha',
      accept: 'image/*,.pdf',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">Upload Dokumen</h2>
        <p className="text-secondary mb-8">
          Unggah semua dokumen yang diperlukan dengan format yang jelas dan terbaca
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {uploadFields.map((field, index) => (
            <div
              key={field.key}
              className="border border-border rounded-lg p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <label className="block text-base font-semibold text-foreground mb-1">
                    {field.label}
                  </label>
                  <p className="text-sm text-muted-foreground mb-4">{field.description}</p>

                  <input
                    type="file"
                    accept={field.accept}
                    onChange={(e) => handleFileChange(e, field.key)}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />

                  {formData[field.key] && (
                    <div className="mt-2 flex items-center gap-2 text-success">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium">{formData[field.key]!.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Info Box */}
          <div className="bg-warning/10 border border-warning rounded-lg p-4 flex gap-3">
            <svg className="w-6 h-6 text-warning flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-foreground">Perhatian:</p>
              <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside">
                <li>Pastikan semua dokumen terlihat jelas dan tidak blur</li>
                <li>Format file yang diterima: JPG, PNG, atau PDF</li>
                <li>Ukuran maksimal per file: 5 MB</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-3 px-6 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                isValid
                  ? 'bg-primary hover:bg-primary-600 text-primary-foreground cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit Pengajuan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
