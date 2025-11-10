'use client';

import { useState } from 'react';
import { DataBisnis as DataBisnisType } from '@/types/loan-application';

interface DataBisnisProps {
  data: DataBisnisType;
  onNext: (data: DataBisnisType) => void;
  onBack: () => void;
}

export default function DataBisnis({ data, onNext, onBack }: DataBisnisProps) {
  const [formData, setFormData] = useState<DataBisnisType>(data);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'fileLegalitas' | 'fotoProduk'
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
    formData.namaUsaha &&
    formData.jenisUsaha &&
    formData.legalitas &&
    formData.fileLegalitas &&
    formData.lamaUsaha &&
    formData.omsetPerbulan &&
    formData.alamatUsaha &&
    formData.provinsi &&
    formData.kotaKabupaten &&
    formData.desa &&
    formData.kodePosUsaha &&
    formData.jenisProduk &&
    formData.fotoProduk &&
    formData.menyetujuiSyarat;

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
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Data Bisnis</h2>
        <div className="bg-warning/10 border border-warning rounded-lg p-4 mb-6">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Penting:</span> Sebelum melakukan pengisian
            pastikan anda sudah memiliki usaha minimal 6 bulan dibuktikan dengan SKTU
            (Surat Keterangan Tempat Usaha) dan/atau NIB (Nomor Induk Berusaha)
          </p>
          <div className="mt-2 text-sm">
            <p className="text-foreground">Belum memiliki:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>
                <span className="font-medium">SKTU</span> - Datang ke kelurahan setempat
              </li>
              <li>
                <span className="font-medium">NIB</span> - Daftar melalui{' '}
                <a
                  href="https://oss.go.id/id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-600 underline"
                >
                  oss.go.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nama Usaha
            </label>
            <input
              type="text"
              value={formData.namaUsaha}
              onChange={(e) => setFormData({ ...formData, namaUsaha: e.target.value })}
              placeholder="Masukkan nama usaha"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Jenis Usaha
            </label>
            <input
              type="text"
              value={formData.jenisUsaha}
              onChange={(e) => setFormData({ ...formData, jenisUsaha: e.target.value })}
              placeholder="Contoh: Perdagangan, Jasa, Produksi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Legalitas
              </label>
              <select
                value={formData.legalitas}
                onChange={(e) => setFormData({ ...formData, legalitas: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="">Pilih legalitas</option>
                <option value="SKTU">SKTU</option>
                <option value="NIB">NIB</option>
                <option value="keduanya">SKTU & NIB</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Upload Legalitas
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileChange(e, 'fileLegalitas')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary hover:file:bg-primary-100"
              />
              {formData.fileLegalitas && (
                <p className="mt-1 text-sm text-success">{formData.fileLegalitas.name}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Lama Usaha (tahun)
              </label>
              <input
                type="number"
                value={formData.lamaUsaha}
                onChange={(e) => setFormData({ ...formData, lamaUsaha: e.target.value })}
                placeholder="Contoh: 2"
                step="0.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Omset Per Bulan (Rp)
              </label>
              <input
                type="number"
                value={formData.omsetPerbulan}
                onChange={(e) =>
                  setFormData({ ...formData, omsetPerbulan: e.target.value })
                }
                placeholder="Contoh: 10000000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Alamat Usaha
            </label>
            <textarea
              value={formData.alamatUsaha}
              onChange={(e) => setFormData({ ...formData, alamatUsaha: e.target.value })}
              placeholder="Masukkan alamat usaha lengkap"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Provinsi
              </label>
              <input
                type="text"
                value={formData.provinsi}
                onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                placeholder="Contoh: DKI Jakarta"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Kota/Kabupaten
              </label>
              <input
                type="text"
                value={formData.kotaKabupaten}
                onChange={(e) =>
                  setFormData({ ...formData, kotaKabupaten: e.target.value })
                }
                placeholder="Contoh: Jakarta Selatan"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Desa</label>
              <input
                type="text"
                value={formData.desa}
                onChange={(e) => setFormData({ ...formData, desa: e.target.value })}
                placeholder="Contoh: Kebayoran Baru"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Kode Pos
              </label>
              <input
                type="text"
                value={formData.kodePosUsaha}
                onChange={(e) =>
                  setFormData({ ...formData, kodePosUsaha: e.target.value })
                }
                placeholder="5 digit kode pos"
                maxLength={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Jenis Produk yang Dihasilkan
            </label>
            <select
              value={formData.jenisProduk}
              onChange={(e) => setFormData({ ...formData, jenisProduk: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
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
              Foto Produk
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'fotoProduk')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary hover:file:bg-primary-100"
            />
            {formData.fotoProduk && (
              <p className="mt-1 text-sm text-success">{formData.fotoProduk.name}</p>
            )}
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
              Data yang saya berikan adalah benar dan dapat dipertanggungjawabkan
            </span>
          </label>

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
              Lanjut ke Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
