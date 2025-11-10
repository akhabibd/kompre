'use client';

import { useState } from 'react';
import { LoanApplicationData } from '@/types/loan-application';
import SyaratKetentuanModal from './SyaratKetentuanModal';

interface ReviewProps {
  data: LoanApplicationData;
  onSubmit: () => void;
  onBack: () => void;
}

export default function Review({ data, onSubmit, onBack }: ReviewProps) {
  const [agreed, setAgreed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreed) {
      onSubmit();
    }
  };

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(Number(value));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Ringkasan Pengajuan Pinjaman
        </h2>
        <p className="text-secondary mb-6">
          Periksa kembali data Anda sebelum submit
        </p>

        <div className="space-y-6">
          {/* Prescreening Data */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Data Prescreening
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-secondary">Besaran Pinjaman:</span>
                <span className="text-foreground font-medium">
                  {formatCurrency(data.prescreening.besaranPinjaman)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Jangka Waktu:</span>
                <span className="text-foreground font-medium">
                  {data.prescreening.jangkaWaktu} bulan
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Tujuan Penggunaan:</span>
                <span className="text-foreground font-medium">
                  {data.prescreening.tujuanPenggunaan === 'modal-usaha'
                    ? 'Modal Usaha'
                    : 'Investasi'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Nama Lengkap:</span>
                <span className="text-foreground font-medium">
                  {data.prescreening.namaLengkap}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Nomor KTP:</span>
                <span className="text-foreground font-medium">
                  {data.prescreening.nomorKTP}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Jenis Kelamin:</span>
                <span className="text-foreground font-medium capitalize">
                  {data.prescreening.jenisKelamin}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Tempat, Tanggal Lahir:</span>
                <span className="text-foreground font-medium">
                  {data.prescreening.tempatLahir}, {data.prescreening.tanggalLahir}
                </span>
              </div>
            </div>
          </div>

          {/* Business Data */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Data Usaha</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-secondary">Nama Usaha:</span>
                <span className="text-foreground font-medium">
                  {data.dataBisnis.namaUsaha}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Jenis Usaha:</span>
                <span className="text-foreground font-medium">
                  {data.dataBisnis.jenisUsaha}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Legalitas:</span>
                <span className="text-foreground font-medium">
                  {data.dataBisnis.legalitas}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Lama Usaha:</span>
                <span className="text-foreground font-medium">
                  {data.dataBisnis.lamaUsaha} tahun
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Omset Per Bulan:</span>
                <span className="text-foreground font-medium">
                  {formatCurrency(data.dataBisnis.omsetPerbulan)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Alamat Usaha:</span>
                <span className="text-foreground font-medium text-right max-w-xs">
                  {data.dataBisnis.alamatUsaha}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Jenis Produk:</span>
                <span className="text-foreground font-medium">
                  {data.dataBisnis.jenisProduk}
                </span>
              </div>
            </div>
          </div>

          {/* Prescreening Result */}
          <div className="border border-success rounded-lg p-6 bg-success/10">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Hasil Prescreening
            </h3>
            <p className="text-foreground">
              Anda memenuhi syarat untuk pembiayaan:{' '}
              <span className="font-bold text-primary">
                {data.prescreeningResult.result}
              </span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <label className="flex items-start space-x-3 cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 mt-0.5 border-2 border-gray-300 rounded appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-colors"
                />
                {agreed && (
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
                Dengan menekan tombol "Setuju & Ajukan Pinjaman", saya menyatakan bahwa
                saya telah membaca dan menyetujui{' '}
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="text-primary hover:text-primary-600 underline font-medium"
                >
                  syarat dan ketentuan
                </button>{' '}
                yang berlaku
              </span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-3 px-6 border border-gray-300 rounded-lg font-medium text-foreground hover:bg-gray-50 transition-colors"
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={!agreed}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                agreed
                  ? 'bg-primary hover:bg-primary-600 text-white cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Setuju & Ajukan Pinjaman
            </button>
          </div>
        </form>
      </div>

      {showModal && <SyaratKetentuanModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
