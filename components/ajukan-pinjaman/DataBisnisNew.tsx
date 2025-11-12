'use client';

import { useState } from 'react';
import { DataBisnis } from '@/types/loan-application';

interface DataBisnisNewProps {
  data: DataBisnis;
  onNext: (data: DataBisnis) => void;
  onBack: () => void;
}

// Mock data LinKUR untuk bisnis
const mockLinKURBisnisData: DataBisnis = {
  useLinKURData: true,
  namaUsaha: 'Toko Berkah Jaya',
  jenisUsaha: 'Perdagangan Retail',
  legalitas: 'SKTU',
  lamaUsaha: '2',
  omsetPerbulan: '25000000',
  alamatUsaha: 'Jl. Pasar Baru No. 45, Jakarta Pusat',
  provinsi: 'DKI Jakarta',
  kotaKabupaten: 'Jakarta Pusat',
  desa: 'Pasar Baru',
  kodePosUsaha: '10710',
  jenisProduk: 'Makanan & Minuman',
  deskripsiUsaha: 'Toko retail yang menjual berbagai kebutuhan sehari-hari dan makanan',
  jumlahKaryawan: '3',
};

export default function DataBisnisNew({ data, onNext, onBack }: DataBisnisNewProps) {
  const [formData, setFormData] = useState<DataBisnis>(data);

  const handleChange = (field: keyof DataBisnis, value: string | boolean) => {
    if (field === 'useLinKURData' && value === true) {
      // Auto-fill with LinKUR business data
      setFormData(mockLinKURBisnisData);
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext(formData);
    }
  };

  const isValid =
    formData.namaUsaha &&
    formData.jenisUsaha &&
    formData.legalitas &&
    formData.lamaUsaha &&
    formData.omsetPerbulan &&
    formData.alamatUsaha &&
    formData.provinsi &&
    formData.kotaKabupaten &&
    formData.desa &&
    formData.kodePosUsaha &&
    formData.jenisProduk &&
    formData.deskripsiUsaha &&
    formData.jumlahKaryawan;

  const kategoriProduk = [
    'Makanan & Minuman',
    'Fashion & Pakaian',
    'Kerajinan Tangan',
    'Pertanian',
    'Peternakan',
    'Perikanan',
    'Jasa',
    'Teknologi',
    'Lainnya',
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">Data Bisnis</h2>
        <p className="text-secondary mb-6">
          Lengkapi informasi usaha Anda
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Checkbox Use LinKUR Data */}
          <label className="flex items-start space-x-3 cursor-pointer p-4 bg-muted/50 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                checked={formData.useLinKURData}
                onChange={(e) => handleChange('useLinKURData', e.target.checked)}
                className="w-5 h-5 border-2 border-input rounded appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-colors"
              />
              {formData.useLinKURData && (
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
            <div>
              <span className="text-sm font-semibold text-foreground block">
                Gunakan data dari LinKUR
              </span>
              <span className="text-xs text-muted-foreground">
                Otomatis isi form dengan data bisnis yang sudah terdaftar
              </span>
            </div>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nama Usaha
              </label>
              <input
                type="text"
                value={formData.namaUsaha}
                onChange={(e) => handleChange('namaUsaha', e.target.value)}
                placeholder="Nama usaha Anda"
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Jenis Usaha
              </label>
              <input
                type="text"
                value={formData.jenisUsaha}
                onChange={(e) => handleChange('jenisUsaha', e.target.value)}
                placeholder="Contoh: Perdagangan, Jasa"
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Legalitas
              </label>
              <select
                value={formData.legalitas}
                onChange={(e) => handleChange('legalitas', e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
              >
                <option value="">Pilih legalitas</option>
                <option value="SKTU">SKTU</option>
                <option value="NIB">NIB</option>
                <option value="keduanya">SKTU & NIB</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Lama Usaha (tahun)
              </label>
              <input
                type="number"
                value={formData.lamaUsaha}
                onChange={(e) => handleChange('lamaUsaha', e.target.value)}
                placeholder="Minimal 0.5"
                step="0.5"
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Omset Per Bulan (Rp)
              </label>
              <input
                type="number"
                value={formData.omsetPerbulan}
                onChange={(e) => handleChange('omsetPerbulan', e.target.value)}
                placeholder="Contoh: 25000000"
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Jumlah Karyawan
              </label>
              <input
                type="number"
                value={formData.jumlahKaryawan}
                onChange={(e) => handleChange('jumlahKaryawan', e.target.value)}
                placeholder="Jumlah karyawan"
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Alamat Usaha
            </label>
            <textarea
              value={formData.alamatUsaha}
              onChange={(e) => handleChange('alamatUsaha', e.target.value)}
              placeholder="Alamat lengkap usaha"
              rows={2}
              className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Provinsi
              </label>
              <input
                type="text"
                value={formData.provinsi}
                onChange={(e) => handleChange('provinsi', e.target.value)}
                placeholder="Contoh: DKI Jakarta"
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Kota/Kabupaten
              </label>
              <input
                type="text"
                value={formData.kotaKabupaten}
                onChange={(e) => handleChange('kotaKabupaten', e.target.value)}
                placeholder="Contoh: Jakarta Pusat"
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Desa/Kelurahan
              </label>
              <input
                type="text"
                value={formData.desa}
                onChange={(e) => handleChange('desa', e.target.value)}
                placeholder="Contoh: Kemang"
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Kode Pos
            </label>
            <input
              type="text"
              value={formData.kodePosUsaha}
              onChange={(e) => handleChange('kodePosUsaha', e.target.value)}
              placeholder="5 digit kode pos"
              maxLength={5}
              className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Jenis Produk yang Dihasilkan
            </label>
            <select
              value={formData.jenisProduk}
              onChange={(e) => handleChange('jenisProduk', e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
            >
              <option value="">Pilih kategori produk</option>
              {kategoriProduk.map((kategori) => (
                <option key={kategori} value={kategori}>
                  {kategori}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Deskripsi Usaha
            </label>
            <textarea
              value={formData.deskripsiUsaha}
              onChange={(e) => handleChange('deskripsiUsaha', e.target.value)}
              placeholder="Jelaskan secara singkat tentang usaha Anda"
              rows={3}
              className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
            />
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
              Lanjut ke Upload Dokumen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
