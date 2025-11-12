'use client';

import { useState, useEffect } from 'react';
import { PrescreeningData, ProfilPengajuan, ProfilNasabah } from '@/types/loan-application';

interface PrescreeningNewProps {
  data: PrescreeningData;
  onNext: (data: PrescreeningData) => void;
  onBack: () => void;
}

// Mock data LinKUR
const mockLinKURData: ProfilNasabah = {
  useLinKURData: true,
  namaLengkap: 'Budi Santoso',
  nomorKTP: '3201234567890123',
  nomorKK: '3201234567890123',
  nomorNPWP: '12.345.678.9-012.000',
  jenisKelamin: 'laki-laki',
  tempatLahir: 'Jakarta',
  tanggalLahir: '1985-05-15',
  alamatKTP: 'Jl. Sudirman No. 123, Jakarta Pusat',
  kodePos: '10110',
  nomorHP: '08123456789',
  email: 'budi.santoso@email.com',
};

// Demo data untuk testing
const demoDataBerhasil: PrescreeningData = {
  profilPengajuan: {
    jumlahPengajuan: '50000000',
    peruntukan: 'Pembelian Stock',
    tenor: '3',
    estimasiCicilan: '0',
  },
  profilNasabah: mockLinKURData,
};

const demoDataGagal: PrescreeningData = {
  profilPengajuan: {
    jumlahPengajuan: '150000000', // Over limit
    peruntukan: 'Biaya Operasional',
    tenor: '1',
    estimasiCicilan: '0',
  },
  profilNasabah: {
    ...mockLinKURData,
    namaLengkap: 'Ahmad Rejected',
  },
};

export default function PrescreeningNew({ data, onNext, onBack }: PrescreeningNewProps) {
  const [formData, setFormData] = useState<PrescreeningData>(data);

  // Calculate monthly installment
  useEffect(() => {
    const jumlah = parseFloat(formData.profilPengajuan.jumlahPengajuan) || 0;
    const tenor = parseInt(formData.profilPengajuan.tenor) || 0;

    if (jumlah > 0 && tenor > 0) {
      // Simple calculation: (principal + 6% annual interest) / months
      const bunga = jumlah * 0.06 * tenor;
      const total = jumlah + bunga;
      const cicilan = total / (tenor * 12);

      setFormData(prev => ({
        ...prev,
        profilPengajuan: {
          ...prev.profilPengajuan,
          estimasiCicilan: Math.round(cicilan).toString(),
        },
      }));
    }
  }, [formData.profilPengajuan.jumlahPengajuan, formData.profilPengajuan.tenor]);

  const handleProfilPengajuanChange = (field: keyof ProfilPengajuan, value: string) => {
    setFormData({
      ...formData,
      profilPengajuan: {
        ...formData.profilPengajuan,
        [field]: value,
      },
    });
  };

  const handleProfilNasabahChange = (field: keyof ProfilNasabah, value: string | boolean) => {
    if (field === 'useLinKURData' && value === true) {
      // Auto-fill with LinKUR data
      setFormData({
        ...formData,
        profilNasabah: mockLinKURData,
      });
    } else {
      setFormData({
        ...formData,
        profilNasabah: {
          ...formData.profilNasabah,
          [field]: value,
        },
      });
    }
  };

  const handleDemoFill = (type: 'berhasil' | 'gagal') => {
    const demoData = type === 'berhasil' ? demoDataBerhasil : demoDataGagal;
    setFormData(demoData);
    alert(`Demo data ${type} telah diisi otomatis!`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext(formData);
    }
  };

  const isValid =
    formData.profilPengajuan.jumlahPengajuan &&
    formData.profilPengajuan.peruntukan &&
    formData.profilPengajuan.tenor &&
    formData.profilNasabah.namaLengkap &&
    formData.profilNasabah.nomorKTP &&
    formData.profilNasabah.nomorKK &&
    formData.profilNasabah.nomorNPWP &&
    formData.profilNasabah.jenisKelamin &&
    formData.profilNasabah.tempatLahir &&
    formData.profilNasabah.tanggalLahir &&
    formData.profilNasabah.alamatKTP &&
    formData.profilNasabah.kodePos &&
    formData.profilNasabah.nomorHP &&
    formData.profilNasabah.email;

  const formatCurrency = (value: string) => {
    const num = parseFloat(value) || 0;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Demo Buttons */}
      <div className="mb-4 flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => handleDemoFill('berhasil')}
          className="px-4 py-2 bg-success hover:bg-success/90 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Demo Berhasil
        </button>
        <button
          type="button"
          onClick={() => handleDemoFill('gagal')}
          className="px-4 py-2 bg-error hover:bg-error/90 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Demo Gagal
        </button>
      </div>

      <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">Prescreening</h2>
        <p className="text-secondary mb-8">
          Lakukan prescreening untuk mengetahui kelayakan pembiayaan Anda
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profil Pengajuan */}
            <div className="bg-muted/50 rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">1</span>
                </div>
                Profil Pengajuan
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Jumlah Pengajuan (Rp)
                  </label>
                  <input
                    type="number"
                    value={formData.profilPengajuan.jumlahPengajuan}
                    onChange={(e) =>
                      handleProfilPengajuanChange('jumlahPengajuan', e.target.value)
                    }
                    placeholder="Contoh: 50000000"
                    className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                  />
                  <p className="mt-1 text-xs text-error font-medium">* Max pinjaman KUR 100 juta</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Peruntukan
                  </label>
                  <select
                    value={formData.profilPengajuan.peruntukan}
                    onChange={(e) => handleProfilPengajuanChange('peruntukan', e.target.value)}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                  >
                    <option value="">Pilih Peruntukan</option>
                    <option value="Pembelian Stock">Pembelian Stock</option>
                    <option value="Biaya Operasional">Biaya Operasional</option>
                    <option value="Pembelian Mesin / Kendaraan Operasional">
                      Pembelian Mesin / Kendaraan Operasional
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tenor (Tahun)
                  </label>
                  <select
                    value={formData.profilPengajuan.tenor}
                    onChange={(e) => handleProfilPengajuanChange('tenor', e.target.value)}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                  >
                    <option value="">Pilih Tenor</option>
                    <option value="1">1 Tahun</option>
                    <option value="2">2 Tahun</option>
                    <option value="3">3 Tahun</option>
                    <option value="4">4 Tahun</option>
                    <option value="5">5 Tahun</option>
                  </select>
                </div>

                {formData.profilPengajuan.estimasiCicilan !== '0' && (
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary">
                    <p className="text-sm text-muted-foreground mb-1">Estimasi Cicilan / Bulan</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(formData.profilPengajuan.estimasiCicilan)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      * Perhitungan estimasi dengan bunga 6% per tahun
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Profil Nasabah */}
            <div className="bg-muted/50 rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">2</span>
                </div>
                Profil Nasabah
              </h3>

              <div className="space-y-4">
                {/* Checkbox Use LinKUR Data */}
                <label className="flex items-start space-x-3 cursor-pointer p-3 bg-white rounded-lg border border-border hover:border-primary transition-colors">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={formData.profilNasabah.useLinKURData}
                      onChange={(e) =>
                        handleProfilNasabahChange('useLinKURData', e.target.checked)
                      }
                      className="w-5 h-5 border-2 border-input rounded appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-colors"
                    />
                    {formData.profilNasabah.useLinKURData && (
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
                    Gunakan data dari LinKUR
                  </span>
                </label>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={formData.profilNasabah.namaLengkap}
                      onChange={(e) =>
                        handleProfilNasabahChange('namaLengkap', e.target.value)
                      }
                      placeholder="Nama lengkap sesuai KTP"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nomor KTP
                      </label>
                      <input
                        type="text"
                        value={formData.profilNasabah.nomorKTP}
                        onChange={(e) =>
                          handleProfilNasabahChange('nomorKTP', e.target.value)
                        }
                        placeholder="16 digit"
                        maxLength={16}
                        className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nomor KK
                      </label>
                      <input
                        type="text"
                        value={formData.profilNasabah.nomorKK}
                        onChange={(e) =>
                          handleProfilNasabahChange('nomorKK', e.target.value)
                        }
                        placeholder="16 digit"
                        maxLength={16}
                        className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nomor NPWP
                    </label>
                    <input
                      type="text"
                      value={formData.profilNasabah.nomorNPWP}
                      onChange={(e) =>
                        handleProfilNasabahChange('nomorNPWP', e.target.value)
                      }
                      placeholder="00.000.000.0-000.000"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Jenis Kelamin
                    </label>
                    <select
                      value={formData.profilNasabah.jenisKelamin}
                      onChange={(e) =>
                        handleProfilNasabahChange('jenisKelamin', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                    >
                      <option value="">Pilih</option>
                      <option value="laki-laki">Laki-laki</option>
                      <option value="perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tempat Lahir
                      </label>
                      <input
                        type="text"
                        value={formData.profilNasabah.tempatLahir}
                        onChange={(e) =>
                          handleProfilNasabahChange('tempatLahir', e.target.value)
                        }
                        placeholder="Kota"
                        className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        value={formData.profilNasabah.tanggalLahir}
                        onChange={(e) =>
                          handleProfilNasabahChange('tanggalLahir', e.target.value)
                        }
                        className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Alamat KTP
                    </label>
                    <textarea
                      value={formData.profilNasabah.alamatKTP}
                      onChange={(e) =>
                        handleProfilNasabahChange('alamatKTP', e.target.value)
                      }
                      placeholder="Alamat lengkap"
                      rows={2}
                      className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Kode Pos
                      </label>
                      <input
                        type="text"
                        value={formData.profilNasabah.kodePos}
                        onChange={(e) =>
                          handleProfilNasabahChange('kodePos', e.target.value)
                        }
                        placeholder="5 digit"
                        maxLength={5}
                        className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nomor HP
                      </label>
                      <input
                        type="tel"
                        value={formData.profilNasabah.nomorHP}
                        onChange={(e) =>
                          handleProfilNasabahChange('nomorHP', e.target.value)
                        }
                        placeholder="08xxxxxxxxxx"
                        className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.profilNasabah.email}
                      onChange={(e) =>
                        handleProfilNasabahChange('email', e.target.value)
                      }
                      placeholder="email@example.com"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
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
              Submit Prescreening
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
