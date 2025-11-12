'use client';

import { useState } from 'react';
import { LoanApplicationData } from '@/types/loan-application';

interface ReviewSubmitProps {
  data: LoanApplicationData;
  onSubmit: () => void;
  onBack: () => void;
}

export default function ReviewSubmit({ data, onSubmit, onBack }: ReviewSubmitProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const formatCurrency = (value: string) => {
    const num = parseFloat(value) || 0;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (acceptedTerms) {
      onSubmit();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">Review & Submit</h2>
        <p className="text-secondary mb-8">
          Periksa kembali data Anda sebelum mengirimkan pengajuan
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profil Pengajuan Summary */}
          <div className="border border-border rounded-lg p-6 bg-muted/30">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              Profil Pengajuan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Jumlah Pengajuan</p>
                <p className="text-base font-semibold text-foreground">
                  {formatCurrency(data.prescreening.profilPengajuan.jumlahPengajuan)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Peruntukan</p>
                <p className="text-base font-semibold text-foreground">
                  {data.prescreening.profilPengajuan.peruntukan}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tenor</p>
                <p className="text-base font-semibold text-foreground">
                  {data.prescreening.profilPengajuan.tenor} Tahun
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimasi Cicilan / Bulan</p>
                <p className="text-base font-semibold text-primary">
                  {formatCurrency(data.prescreening.profilPengajuan.estimasiCicilan)}
                </p>
              </div>
            </div>
          </div>

          {/* Profil Nasabah Summary */}
          <div className="border border-border rounded-lg p-6 bg-muted/30">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary"
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
              Data Pribadi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                <p className="text-base font-semibold text-foreground">
                  {data.prescreening.profilNasabah.namaLengkap}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nomor KTP</p>
                <p className="text-base font-semibold text-foreground">
                  {data.prescreening.profilNasabah.nomorKTP}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nomor HP</p>
                <p className="text-base font-semibold text-foreground">
                  {data.prescreening.profilNasabah.nomorHP}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-base font-semibold text-foreground">
                  {data.prescreening.profilNasabah.email}
                </p>
              </div>
            </div>
          </div>

          {/* Data Bisnis Summary */}
          <div className="border border-border rounded-lg p-6 bg-muted/30">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              Data Bisnis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nama Usaha</p>
                <p className="text-base font-semibold text-foreground">
                  {data.dataBisnis.namaUsaha}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jenis Usaha</p>
                <p className="text-base font-semibold text-foreground">
                  {data.dataBisnis.jenisUsaha}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lama Usaha</p>
                <p className="text-base font-semibold text-foreground">
                  {data.dataBisnis.lamaUsaha} Tahun
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Omset Per Bulan</p>
                <p className="text-base font-semibold text-foreground">
                  {formatCurrency(data.dataBisnis.omsetPerbulan)}
                </p>
              </div>
            </div>
          </div>

          {/* Uploaded Documents Summary */}
          <div className="border border-border rounded-lg p-6 bg-muted/30">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              Dokumen yang Diunggah
            </h3>
            <div className="space-y-2">
              {data.uploadDocuments.fileKTP && (
                <div className="flex items-center gap-2 text-success">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-foreground">
                    e-KTP: {data.uploadDocuments.fileKTP.name}
                  </span>
                </div>
              )}
              {data.uploadDocuments.fileSelfieKTP && (
                <div className="flex items-center gap-2 text-success">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-foreground">
                    Selfie dengan e-KTP: {data.uploadDocuments.fileSelfieKTP.name}
                  </span>
                </div>
              )}
              {data.uploadDocuments.fileKK && (
                <div className="flex items-center gap-2 text-success">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-foreground">
                    Kartu Keluarga: {data.uploadDocuments.fileKK.name}
                  </span>
                </div>
              )}
              {data.uploadDocuments.fileNPWP && (
                <div className="flex items-center gap-2 text-success">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-foreground">
                    NPWP: {data.uploadDocuments.fileNPWP.name}
                  </span>
                </div>
              )}
              {data.uploadDocuments.fileSKTU && (
                <div className="flex items-center gap-2 text-success">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-foreground">
                    SKTU/NIB: {data.uploadDocuments.fileSKTU.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Syarat & Ketentuan */}
          <div className="border border-border rounded-lg p-6 bg-warning/5">
            <div className="flex items-start gap-3 mb-4">
              <svg
                className="w-6 h-6 text-warning flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-foreground mb-2">
                  Syarat & Ketentuan
                </h4>
                <div className="text-sm text-muted-foreground space-y-2 max-h-48 overflow-y-auto pr-2">
                  <p className="font-medium text-foreground">
                    Dengan menekan tombol "Setuju & Ajukan Pinjaman", saya menyatakan:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-2">
                    <li>Data dan informasi yang saya berikan adalah sesuai keadaan yang sebenar-benarnya.</li>
                    <li>Saya menyetujui bahwa PT. Bank Rakyat Indonesia (Persero), Tbk. berwenang untuk memeriksa kebenaran data, mencari referensi, menyetujui/menolak pengajuan, dan memberikan data kepada pihak ketiga untuk pemrosesan.</li>
                    <li>Bank tidak berkewajiban memberikan fasilitas kredit hingga semua persyaratan terpenuhi.</li>
                    <li>Segala risiko dan konsekuensi akibat data yang tidak sesuai menjadi tanggung jawab saya sepenuhnya.</li>
                  </ol>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-sm text-primary hover:underline mt-2"
                >
                  Lihat Syarat & Ketentuan Lengkap
                </button>
              </div>
            </div>

            <label className="flex items-start space-x-3 cursor-pointer p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors mt-4">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-5 h-5 border-2 border-input rounded appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-colors"
                />
                {acceptedTerms && (
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
              <span className="text-sm font-medium text-foreground">
                Setuju & Ajukan Pinjaman
              </span>
            </label>
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
              disabled={!acceptedTerms}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                acceptedTerms
                  ? 'bg-primary hover:bg-primary-600 text-primary-foreground cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit Pengajuan
            </button>
          </div>
        </form>
      </div>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Syarat & Ketentuan Lengkap</h3>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="text-sm text-foreground space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="font-semibold text-foreground mb-3">
                    Dengan menekan tombol "Setuju & Ajukan Pinjaman" di bawah ini, saya menyatakan hal-hal sebagai berikut:
                  </p>
                </div>

                <section>
                  <h4 className="font-semibold mb-2">1. Kebenaran Data</h4>
                  <p className="text-muted-foreground">
                    Data dan informasi yang saya berikan dalam pengajuan ini adalah sesuai keadaan yang sebenar-benarnya.
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold mb-2">2. Kewenangan PT. Bank Rakyat Indonesia (Persero), Tbk.</h4>
                  <p className="text-muted-foreground mb-2">
                    Saya menyetujui bahwa PT. Bank Rakyat Indonesia (Persero), Tbk, selanjutnya disebut Bank, berwenang untuk:
                  </p>
                  <ol className="list-[lower-alpha] list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Memeriksa kebenaran data yang saya sampaikan dalam pengajuan ini.</li>
                    <li>Mencari dan memperoleh keterangan dan referensi dari sumber manapun dengan cara yang dianggap sah oleh Bank.</li>
                    <li>Menyetujui atau menolak pengajuan pinjaman saya berdasarkan analisa Bank.</li>
                    <li>Tidak mengembalikan seluruh dokumen yang telah saya serahkan kepada Bank.</li>
                    <li>Memberikan secara terbatas dan/atau tidak terbatas data yang telah saya sampaikan dalam pengajuan ini kepada pihak ketiga dalam rangka kepentingan pemrosesan pengajuan pinjaman.</li>
                  </ol>
                </section>

                <section>
                  <h4 className="font-semibold mb-2">3. Kewajiban Bank</h4>
                  <p className="text-muted-foreground">
                    Saya memahami dan mengerti bahwa Bank tidak berkewajiban untuk memberikan fasilitas kredit kepada saya hingga saya memenuhi semua persyaratan yang berlaku pada Bank dan telah menandatangani dokumen yang diperlukan Bank dalam pemberian kredit.
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold mb-2">4. Tanggung Jawab Pemohon</h4>
                  <p className="text-muted-foreground">
                    Apabila ternyata data dan informasi, serta pernyataan yang saya berikan/buat tidak sesuai dengan keadaan yang sebenarnya, maka segala risiko dan konsekuensi yang diakibatkannya menjadi sepenuhnya tanggung jawab saya.
                  </p>
                </section>

                <section className="mt-6 p-4 bg-warning/5 rounded-lg border border-warning/20">
                  <h4 className="font-semibold mb-2 text-warning">Catatan Penting</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Pembiayaan KUR adalah kredit/pembiayaan modal kerja dan/atau investasi untuk UMKM</li>
                    <li>Pastikan semua data yang diisi adalah benar dan akurat</li>
                    <li>Proses persetujuan memerlukan waktu 3-5 hari kerja</li>
                    <li>Bank berhak menolak pengajuan tanpa memberikan alasan tertentu</li>
                  </ul>
                </section>
              </div>
            </div>
            <div className="p-6 border-t border-border">
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-full py-3 px-6 bg-primary hover:bg-primary-600 text-primary-foreground rounded-lg font-medium transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
