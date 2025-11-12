'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ApplicationStep,
  LoanApplicationData,
  PhoneVerification as PhoneVerificationType,
  UploadDocuments as UploadDocumentsType,
  PrescreeningData,
  PrescreeningResult as PrescreeningResultType,
  DataBisnis,
  UserProfile,
} from '@/types/loan-application';
import ProgressIndicatorNew from '@/components/ajukan-pinjaman/ProgressIndicatorNew';
import PhoneVerification from '@/components/ajukan-pinjaman/PhoneVerification';
import UploadDocuments from '@/components/ajukan-pinjaman/UploadDocuments';
import PrescreeningNew from '@/components/ajukan-pinjaman/PrescreeningNew';
import PrescreeningResultNew from '@/components/ajukan-pinjaman/PrescreeningResultNew';
import DataBisnisNew from '@/components/ajukan-pinjaman/DataBisnisNew';
import Sidebar from '@/components/ajukan-pinjaman/Sidebar';
import ReviewSubmit from '@/components/ajukan-pinjaman/ReviewSubmit';

export default function AjukanPinjamanPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('phone-verification');

  // Mock user profile
  const userProfile: UserProfile = {
    name: 'Budi Santoso',
    phone: '08123456789',
    email: 'budi.santoso@email.com',
  };

  const [formData, setFormData] = useState<LoanApplicationData>({
    phoneVerification: {
      phoneNumber: '',
      verificationCode: '',
      isVerified: false,
      acceptedTerms: false,
    },
    uploadDocuments: {
      fileKTP: null,
      fileSelfieKTP: null,
      fileKK: null,
      fileNPWP: null,
      fileSKTU: null,
    },
    prescreening: {
      profilPengajuan: {
        jumlahPengajuan: '',
        peruntukan: '',
        tenor: '',
        estimasiCicilan: '0',
      },
      profilNasabah: {
        useLinKURData: false,
        namaLengkap: '',
        nomorKTP: '',
        nomorKK: '',
        nomorNPWP: '',
        jenisKelamin: '',
        tempatLahir: '',
        tanggalLahir: '',
        alamatKTP: '',
        kodePos: '',
        nomorHP: '',
        email: '',
      },
    },
    prescreeningResult: {
      status: 'submitted',
      result: null,
    },
    dataBisnis: {
      useLinKURData: false,
      namaUsaha: '',
      jenisUsaha: '',
      legalitas: '',
      lamaUsaha: '',
      omsetPerbulan: '',
      alamatUsaha: '',
      provinsi: '',
      kotaKabupaten: '',
      desa: '',
      kodePosUsaha: '',
      jenisProduk: '',
      deskripsiUsaha: '',
      jumlahKaryawan: '',
    },
  });

  const handlePhoneVerificationNext = (data: PhoneVerificationType) => {
    setFormData({ ...formData, phoneVerification: data });
    setCurrentStep('prescreening');
  };

  const handlePrescreeningNext = (data: PrescreeningData) => {
    setFormData({ ...formData, prescreening: data });
    setCurrentStep('prescreening-result');
  };

  const handlePrescreeningResultNext = (result: PrescreeningResultType) => {
    setFormData({ ...formData, prescreeningResult: result });
    setCurrentStep('data-bisnis');
  };

  const handleDataBisnisNext = (data: DataBisnis) => {
    setFormData({ ...formData, dataBisnis: data });
    setCurrentStep('upload-documents');
  };

  const handleUploadDocumentsNext = (data: UploadDocumentsType) => {
    setFormData({ ...formData, uploadDocuments: data });
    setCurrentStep('review');
  };

  const handleFinalSubmit = () => {
    // In production, this would send data to API then redirect
    console.log('Submitting application:', formData);
    alert('Pengajuan pinjaman berhasil disubmit!');
    router.push('/tracker');
  };

  const handleBack = () => {
    const stepOrder: ApplicationStep[] = [
      'phone-verification',
      'prescreening',
      'prescreening-result',
      'data-bisnis',
      'upload-documents',
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
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">LinKUR</h1>
            <a
              href="/"
              className="text-sm text-secondary hover:text-foreground transition-colors"
            >
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Left */}
          <div className="lg:col-span-1">
            <Sidebar user={userProfile} />
          </div>

          {/* Main Form - Right */}
          <div className="lg:col-span-3">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Ajukan Pembiayaan KUR
              </h1>
              <p className="text-secondary">
                Lengkapi formulir berikut untuk mengajukan pembiayaan
              </p>
            </div>

            <ProgressIndicatorNew currentStep={currentStep} />

            <div className="mt-8">
              {currentStep === 'phone-verification' && (
                <PhoneVerification
                  data={formData.phoneVerification}
                  onNext={handlePhoneVerificationNext}
                />
              )}

              {currentStep === 'upload-documents' && (
                <UploadDocuments
                  data={formData.uploadDocuments}
                  onNext={handleUploadDocumentsNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 'prescreening' && (
                <PrescreeningNew
                  data={formData.prescreening}
                  onNext={handlePrescreeningNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 'prescreening-result' && (
                <PrescreeningResultNew
                  prescreeningData={formData.prescreening}
                  onNext={handlePrescreeningResultNext}
                />
              )}

              {currentStep === 'data-bisnis' && (
                <DataBisnisNew
                  data={formData.dataBisnis}
                  onNext={handleDataBisnisNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 'review' && (
                <ReviewSubmit
                  data={formData}
                  onSubmit={handleFinalSubmit}
                  onBack={handleBack}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
