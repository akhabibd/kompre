export interface PhoneVerification {
  phoneNumber: string;
  verificationCode: string;
  isVerified: boolean;
  acceptedTerms: boolean;
}

export interface UploadDocuments {
  fileKTP: File | null;
  fileSelfieKTP: File | null;
  fileKK: File | null;
  fileNPWP: File | null;
  fileSKTU: File | null;
}

export interface ProfilPengajuan {
  jumlahPengajuan: string;
  peruntukan: string;
  tenor: string;
  estimasiCicilan: string;
}

export interface ProfilNasabah {
  useLinKURData: boolean;
  namaLengkap: string;
  nomorKTP: string;
  nomorKK: string;
  nomorNPWP: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamatKTP: string;
  kodePos: string;
  nomorHP: string;
  email: string;
}

export interface PrescreeningData {
  profilPengajuan: ProfilPengajuan;
  profilNasabah: ProfilNasabah;
}

export interface PrescreeningResult {
  status: 'submitted' | 'checking' | 'done';
  result: 'KUR' | 'rejected' | null;
}

export interface DataBisnis {
  useLinKURData: boolean;
  namaUsaha: string;
  jenisUsaha: string;
  legalitas: string;
  lamaUsaha: string;
  omsetPerbulan: string;
  alamatUsaha: string;
  provinsi: string;
  kotaKabupaten: string;
  desa: string;
  kodePosUsaha: string;
  jenisProduk: string;
  deskripsiUsaha: string;
  jumlahKaryawan: string;
}

export interface LoanApplicationData {
  phoneVerification: PhoneVerification;
  uploadDocuments: UploadDocuments;
  prescreening: PrescreeningData;
  prescreeningResult: PrescreeningResult;
  dataBisnis: DataBisnis;
}

export type ApplicationStep =
  | 'phone-verification'
  | 'upload-documents'
  | 'prescreening'
  | 'prescreening-result'
  | 'data-bisnis'
  | 'review';

export interface TrackerStatus {
  step: 'prescreening' | 'submitted' | 'in_review' | 'kunjungan' | 'approved' | 'rejected' | 'pencairan';
  date?: string;
  notes?: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  avatar?: string;
}
