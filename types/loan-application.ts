export interface SyaratUtama {
  memberLinkUMKM: boolean;
  memilikiRekeningBRI: boolean;
}

export interface PrescreeningData {
  besaranPinjaman: string;
  jangkaWaktu: string;
  tujuanPenggunaan: string;
  namaLengkap: string;
  nomorKTP: string;
  fileKTP: File | null;
  nomorKK: string;
  fileKK: File | null;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamatKTP: string;
  kodePos: string;
  menyetujuiSyarat: boolean;
}

export interface PrescreeningResult {
  status: 'submitted' | 'checking' | 'done';
  result: 'PUMK' | 'KUR' | 'rejected' | null;
}

export interface DataLinkUMKM {
  confirmed: boolean;
  syncData: boolean;
}

export interface DataBisnis {
  namaUsaha: string;
  jenisUsaha: string;
  legalitas: string;
  fileLegalitas: File | null;
  lamaUsaha: string;
  omsetPerbulan: string;
  alamatUsaha: string;
  provinsi: string;
  kotaKabupaten: string;
  desa: string;
  kodePosUsaha: string;
  jenisProduk: string;
  fotoProduk: File | null;
  menyetujuiSyarat: boolean;
}

export interface LoanApplicationData {
  syaratUtama: SyaratUtama;
  prescreening: PrescreeningData;
  prescreeningResult: PrescreeningResult;
  dataLinkUMKM: DataLinkUMKM;
  dataBisnis: DataBisnis;
}

export type ApplicationStep =
  | 'syarat-utama'
  | 'prescreening'
  | 'prescreening-result'
  | 'data-linkumkm'
  | 'data-bisnis'
  | 'review';

export interface TrackerStatus {
  step: 'prescreening' | 'submitted' | 'in_review' | 'kunjungan' | 'approved' | 'rejected' | 'pencairan';
  date?: string;
  notes?: string;
}
