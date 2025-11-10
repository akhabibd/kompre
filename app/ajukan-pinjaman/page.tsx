'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ApplicationStep,
  LoanApplicationData,
  SyaratUtama as SyaratUtamaType,
  PrescreeningData,
  PrescreeningResult as PrescreeningResultType,
  DataLinkUMKM as DataLinkUMKMType,
  DataBisnis as DataBisnisType,
} from '@/types/loan-application';
import ProgressIndicator from '@/components/ajukan-pinjaman/ProgressIndicator';
import SyaratUtama from '@/components/ajukan-pinjaman/SyaratUtama';
import Prescreening from '@/components/ajukan-pinjaman/Prescreening';
import PrescreeningResult from '@/components/ajukan-pinjaman/PrescreeningResult';
import DataLinkUMKM from '@/components/ajukan-pinjaman/DataLinkUMKM';
import DataBisnis from '@/components/ajukan-pinjaman/DataBisnis';
import Review from '@/components/ajukan-pinjaman/Review';

export default function AjukanPinjamanPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('syarat-utama');
  const [formData, setFormData] = useState<LoanApplicationData>({
    syaratUtama: {
      memberLinkUMKM: false,
      memilikiRekeningBRI: false,
    },
    prescreening: {
      besaranPinjaman: '',
      jangkaWaktu: '',
      tujuanPenggunaan: '',
      namaLengkap: '',
      nomorKTP: '',
      fileKTP: null,
      nomorKK: '',
      fileKK: null,
      jenisKelamin: '',
      tempatLahir: '',
      tanggalLahir: '',
      alamatKTP: '',
      kodePos: '',
      menyetujuiSyarat: false,
    },
    prescreeningResult: {
      status: 'submitted',
      result: null,
    },
    dataLinkUMKM: {
      confirmed: false,
      syncData: false,
    },
    dataBisnis: {
      namaUsaha: '',
      jenisUsaha: '',
      legalitas: '',
      fileLegalitas: null,
      lamaUsaha: '',
      omsetPerbulan: '',
      alamatUsaha: '',
      provinsi: '',
      kotaKabupaten: '',
      desa: '',
      kodePosUsaha: '',
      jenisProduk: '',
      fotoProduk: null,
      menyetujuiSyarat: false,
    },
  });

  const handleSyaratUtamaNext = (data: SyaratUtamaType) => {
    setFormData({ ...formData, syaratUtama: data });
    setCurrentStep('prescreening');
  };

  const handlePrescreeningNext = (data: PrescreeningData) => {
    setFormData({ ...formData, prescreening: data });
    setCurrentStep('prescreening-result');
  };

  const handlePrescreeningResultNext = (result: PrescreeningResultType) => {
    setFormData({ ...formData, prescreeningResult: result });
    setCurrentStep('data-linkumkm');
  };

  const handleDataLinkUMKMNext = (data: DataLinkUMKMType) => {
    setFormData({ ...formData, dataLinkUMKM: data });
    setCurrentStep('data-bisnis');
  };

  const handleDataBisnisNext = (data: DataBisnisType) => {
    setFormData({ ...formData, dataBisnis: data });
    setCurrentStep('review');
  };

  const handleSubmit = () => {
    // In production, this would send data to API
    console.log('Submitting application:', formData);
    alert('Pengajuan pinjaman berhasil disubmit!');
    router.push('/tracker');
  };

  const handleBack = () => {
    const stepOrder: ApplicationStep[] = [
      'syarat-utama',
      'prescreening',
      'prescreening-result',
      'data-linkumkm',
      'data-bisnis',
      'review',
    ];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      // Skip prescreening-result when going back
      if (stepOrder[currentIndex - 1] === 'prescreening-result') {
        setCurrentStep(stepOrder[currentIndex - 2]);
      } else {
        setCurrentStep(stepOrder[currentIndex - 1]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Ajukan Pembiayaan UMKM
          </h1>
          <p className="text-secondary">
            Lengkapi formulir berikut untuk mengajukan pembiayaan UMKM Anda
          </p>
        </div>

        <ProgressIndicator currentStep={currentStep} />

        <div className="mt-8">
          {currentStep === 'syarat-utama' && (
            <SyaratUtama data={formData.syaratUtama} onNext={handleSyaratUtamaNext} />
          )}

          {currentStep === 'prescreening' && (
            <Prescreening
              data={formData.prescreening}
              onNext={handlePrescreeningNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 'prescreening-result' && (
            <PrescreeningResult onNext={handlePrescreeningResultNext} />
          )}

          {currentStep === 'data-linkumkm' && (
            <DataLinkUMKM
              data={formData.dataLinkUMKM}
              onNext={handleDataLinkUMKMNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 'data-bisnis' && (
            <DataBisnis
              data={formData.dataBisnis}
              onNext={handleDataBisnisNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 'review' && (
            <Review data={formData} onSubmit={handleSubmit} onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
}
