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

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const generateTrackingId = () => {
    // Generate unique tracking ID (APP-XXXXXX format)
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `APP-${randomNum}`;
  };

  const handleFinalSubmit = () => {
    // In production, this would send data to API then redirect
    console.log('Submitting application:', formData);
    const newTrackingId = generateTrackingId();
    setTrackingId(newTrackingId);
    setShowSuccessModal(true);
  };

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
    alert('ID Tracking berhasil disalin!');
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

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-2xl max-w-md w-full p-8 border border-border">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-2">
                Pengajuan Berhasil Disubmit!
              </h2>
              <p className="text-secondary mb-6">
                Pengajuan pinjaman Anda telah diterima dan sedang diproses
              </p>

              {/* Tracking ID Box */}
              <div className="bg-primary/10 border-2 border-primary border-dashed rounded-lg p-6 mb-6">
                <p className="text-sm text-muted-foreground mb-2">ID Tracking Anda:</p>
                <div className="text-3xl font-bold text-primary mb-4">{trackingId}</div>
                <button
                  onClick={copyTrackingId}
                  className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg font-medium transition-colors text-sm flex items-center gap-2 mx-auto"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Salin ID
                </button>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-foreground mb-2">
                  <strong>Langkah Selanjutnya:</strong>
                </p>
                <ul className="text-sm text-secondary space-y-1 list-disc list-inside">
                  <li>Simpan ID tracking Anda untuk cek status</li>
                  <li>Proses review dokumen: 1-2 hari kerja</li>
                  <li>Kunjungan pemasar akan dijadwalkan</li>
                  <li>Total proses: 3-5 hari kerja</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push('/')}
                  className="flex-1 py-3 px-6 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition-colors"
                >
                  Kembali ke Beranda
                </button>
                <button
                  onClick={() => router.push('/tracker')}
                  className="flex-1 py-3 px-6 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
                >
                  Cek Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
