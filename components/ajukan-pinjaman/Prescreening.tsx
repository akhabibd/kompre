'use client';

import { useState } from 'react';
import { PrescreeningData } from '@/types/loan-application';

interface PrescreeningProps {
  data: PrescreeningData;
  onNext: (data: PrescreeningData) => void;
  onBack: () => void;
}

export default function Prescreening({ data, onNext, onBack }: PrescreeningProps) {
  const [formData, setFormData] = useState<PrescreeningData>(data);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'fileKTP' | 'fileKK') => {
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
    formData.besaranPinjaman &&
    formData.jangkaWaktu &&
    formData.tujuanPenggunaan &&
    formData.namaLengkap &&
    formData.nomorKTP &&
    formData.fileKTP &&
    formData.nomorKK &&
    formData.fileKK &&
    formData.jenisKelamin &&
    formData.tempatLahir &&
    formData.tanggalLahir &&
    formData.alamatKTP &&
    formData.kodePos &&
    formData.menyetujuiSyarat;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Prescreening</h2>
        <p className="text-secondary mb-6">
          Lakukan prescreening untuk mengetahui kelayakan pembiayaan Anda
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tujuan Box */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Tujuan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Besaran Pinjaman
                </label>
                <input
                  type="number"
                  value={formData.besaranPinjaman}
                  onChange={(e) =>
                    setFormData({ ...formData, besaranPinjaman: e.target.value })
                  }
                  placeholder="Masukkan nominal pinjaman"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
                <p className="mt-1 text-sm text-error">
                  * Max pinjaman mikro 100 juta
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Jangka Waktu Pinjaman (bulan)
                </label>
                <input
                  type="number"
                  value={formData.jangkaWaktu}
                  onChange={(e) => setFormData({ ...formData, jangkaWaktu: e.target.value })}
                  placeholder="Contoh: 12"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tujuan Penggunaan
                </label>
                <select
                  value={formData.tujuanPenggunaan}
                  onChange={(e) =>
                    setFormData({ ...formData, tujuanPenggunaan: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="">Pilih tujuan penggunaan</option>
                  <option value="modal-usaha">Modal Usaha</option>
                  <option value="investasi">Investasi (Pembelian Barang Usaha)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Pemohon Box */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Data Pemohon</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.namaLengkap}
                  onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nomor KTP
                  </label>
                  <input
                    type="text"
                    value={formData.nomorKTP}
                    onChange={(e) => setFormData({ ...formData, nomorKTP: e.target.value })}
                    placeholder="16 digit nomor KTP"
                    maxLength={16}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Upload File KTP
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'fileKTP')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary hover:file:bg-primary-100"
                  />
                  {formData.fileKTP && (
                    <p className="mt-1 text-sm text-success">{formData.fileKTP.name}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nomor KK
                  </label>
                  <input
                    type="text"
                    value={formData.nomorKK}
                    onChange={(e) => setFormData({ ...formData, nomorKK: e.target.value })}
                    placeholder="16 digit nomor KK"
                    maxLength={16}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Upload File KK
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'fileKK')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary hover:file:bg-primary-100"
                  />
                  {formData.fileKK && (
                    <p className="mt-1 text-sm text-success">{formData.fileKK.name}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Jenis Kelamin
                </label>
                <select
                  value={formData.jenisKelamin}
                  onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="laki-laki">Laki-laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    value={formData.tempatLahir}
                    onChange={(e) =>
                      setFormData({ ...formData, tempatLahir: e.target.value })
                    }
                    placeholder="Contoh: Jakarta"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={formData.tanggalLahir}
                    onChange={(e) =>
                      setFormData({ ...formData, tanggalLahir: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Alamat KTP
                </label>
                <textarea
                  value={formData.alamatKTP}
                  onChange={(e) => setFormData({ ...formData, alamatKTP: e.target.value })}
                  placeholder="Masukkan alamat lengkap sesuai KTP"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Kode Pos
                </label>
                <input
                  type="text"
                  value={formData.kodePos}
                  onChange={(e) => setFormData({ ...formData, kodePos: e.target.value })}
                  placeholder="5 digit kode pos"
                  maxLength={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.menyetujuiSyarat}
                  onChange={(e) =>
                    setFormData({ ...formData, menyetujuiSyarat: e.target.checked })
                  }
                  className="w-5 h-5 mt-0.5 border-2 border-gray-300 rounded appearance-none checked:bg-primary checked:border-primary cursor-pointer"
                />
                <span className="text-sm text-foreground">
                  Saya telah membaca dan menyetujui{' '}
                  <button
                    type="button"
                    className="text-primary hover:text-primary-600 underline"
                  >
                    syarat dan ketentuan
                  </button>
                </span>
              </label>
            </div>
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
              Submit Prescreening
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
