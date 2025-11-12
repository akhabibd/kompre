import { DashboardApplication, LoanApplicationData, ApplicationStatus } from '@/types/loan-application';

const NAMA_DEPAN = [
  'Budi', 'Siti', 'Ahmad', 'Dewi', 'Eko', 'Fitri', 'Hadi', 'Indah', 'Joko', 'Kartika',
  'Lukman', 'Maya', 'Nur', 'Oki', 'Putri', 'Rudi', 'Sri', 'Tono', 'Umi', 'Vina',
  'Wawan', 'Yanti', 'Zainal', 'Andi', 'Bambang', 'Citra', 'Dedi', 'Ela', 'Fajar', 'Gita',
  'Hendra', 'Ira', 'Jaya', 'Kiki', 'Lestari', 'Made', 'Nani', 'Oki', 'Purnama', 'Ratna'
];

const NAMA_BELAKANG = [
  'Santoso', 'Wijaya', 'Kusuma', 'Pratama', 'Utomo', 'Hidayat', 'Saputra', 'Wibowo',
  'Nugraha', 'Setiawan', 'Permana', 'Rahayu', 'Sari', 'Lestari', 'Handayani', 'Putri',
  'Mahendra', 'Purnomo', 'Kurniawan', 'Suryanto', 'Firmansyah', 'Gunawan', 'Hakim',
  'Irawan', 'Junaidi', 'Kartika', 'Laksono', 'Mulyadi', 'Natawijaya', 'Oktavian'
];

const KOTA_REGIONAL = [
  { kota: 'Jakarta Pusat', regional: 'Jakarta' },
  { kota: 'Jakarta Selatan', regional: 'Jakarta' },
  { kota: 'Jakarta Timur', regional: 'Jakarta' },
  { kota: 'Bandung', regional: 'Bandung' },
  { kota: 'Cimahi', regional: 'Bandung' },
  { kota: 'Semarang', regional: 'Semarang' },
  { kota: 'Kudus', regional: 'Semarang' },
  { kota: 'Surabaya', regional: 'Surabaya' },
  { kota: 'Malang', regional: 'Malang' },
  { kota: 'Yogyakarta', regional: 'Yogyakarta' },
  { kota: 'Solo', regional: 'Solo' },
  { kota: 'Medan', regional: 'Medan' },
  { kota: 'Palembang', regional: 'Palembang' },
  { kota: 'Bandar Lampung', regional: 'Bandar Lampung' },
  { kota: 'Denpasar', regional: 'Denpasar' },
  { kota: 'Makassar', regional: 'Makassar' },
  { kota: 'Banjarmasin', regional: 'Banjarmasin' },
  { kota: 'Balikpapan', regional: 'Balikpapan' },
  { kota: 'Pontianak', regional: 'Pontianak' },
  { kota: 'Manado', regional: 'Manado' }
];

const JENIS_USAHA = [
  'Perdagangan Retail',
  'Perdagangan Grosir',
  'Kuliner & Makanan',
  'Fashion & Pakaian',
  'Jasa Bengkel',
  'Jasa Salon',
  'Pertanian',
  'Peternakan',
  'Perikanan',
  'Kerajinan Tangan',
  'Elektronik',
  'Fotokopi & Percetakan',
  'Laundry',
  'Warung Sembako',
  'Cafe & Resto',
  'Toko Bangunan',
  'Jasa Kontraktor',
  'Transportasi',
  'Jasa Catering'
];

const NAMA_USAHA_PREFIX = [
  'Toko', 'Warung', 'UD', 'CV', 'PT', 'Bengkel', 'Salon', 'Cafe', 'Resto',
  'Jasa', 'Sumber', 'Berkah', 'Mitra', 'Karya', 'Mandiri', 'Sejahtera'
];

const NAMA_USAHA_SUFFIX = [
  'Jaya', 'Makmur', 'Sentosa', 'Abadi', 'Sukses', 'Rezeki', 'Berkah',
  'Mulia', 'Utama', 'Prima', 'Indah', 'Sejahtera', 'Lancar', 'Barokah'
];

const PERUNTUKAN = [
  'Pembelian Stock',
  'Biaya Operasional',
  'Pembelian Mesin / Kendaraan Operasional'
];

const LOAN_TYPES = ['KUR Mikro'];

const STATUSES: ApplicationStatus[] = [
  'prescreening',
  'submitted',
  'in_review',
  'kunjungan',
  'approved',
  'rejected',
  'pencairan'
];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePhoneNumber(): string {
  const prefixes = ['0812', '0813', '0821', '0822', '0852', '0853', '0851', '0856'];
  return randomElement(prefixes) + String(randomInt(10000000, 99999999));
}

function generateKTP(): string {
  return String(randomInt(3100000000000000, 3599999999999999));
}

function generateNPWP(): string {
  const part1 = String(randomInt(10, 99));
  const part2 = String(randomInt(100, 999));
  const part3 = String(randomInt(100, 999));
  const part4 = String(randomInt(1, 9));
  const part5 = String(randomInt(100, 999));
  const part6 = String(randomInt(0, 999)).padStart(3, '0');
  return `${part1}.${part2}.${part3}.${part4}-${part5}.${part6}`;
}

function generateDateInPast(maxDaysAgo: number): string {
  const now = new Date();
  const daysAgo = randomInt(0, maxDaysAgo);
  const date = new Date(now);
  date.setDate(now.getDate() - daysAgo);
  return date.toISOString();
}

function generateEmail(nama: string): string {
  const clean = nama.toLowerCase().replace(/\s+/g, '.');
  const domains = ['gmail.com', 'yahoo.com', 'email.com', 'mail.com'];
  return `${clean}@${randomElement(domains)}`;
}

function generateMockFullData(borrower: string, plafon: number, city: string): LoanApplicationData {
  const phoneNumber = generatePhoneNumber();
  const nomorKTP = generateKTP();

  return {
    phoneVerification: {
      phoneNumber,
      verificationCode: '123456',
      isVerified: true,
      acceptedTerms: true,
    },
    prescreening: {
      profilPengajuan: {
        jumlahPengajuan: String(plafon),
        peruntukan: randomElement(PERUNTUKAN),
        tenor: String(randomInt(1, 5)),
        estimasiCicilan: String(Math.round((plafon * 1.06) / (randomInt(1, 5) * 12))),
      },
      profilNasabah: {
        useLinKURData: false,
        namaLengkap: borrower,
        nomorKTP,
        nomorKK: generateKTP(),
        nomorNPWP: generateNPWP(),
        jenisKelamin: Math.random() > 0.5 ? 'laki-laki' : 'perempuan',
        tempatLahir: city,
        tanggalLahir: `19${randomInt(70, 99)}-${String(randomInt(1, 12)).padStart(2, '0')}-${String(randomInt(1, 28)).padStart(2, '0')}`,
        alamatKTP: `Jl. ${randomElement(['Sudirman', 'Gatot Subroto', 'Diponegoro', 'Ahmad Yani'])} No. ${randomInt(1, 999)}`,
        kodePos: String(randomInt(10000, 99999)),
        nomorHP: phoneNumber,
        email: generateEmail(borrower),
      },
    },
    prescreeningResult: {
      status: 'done',
      result: 'KUR',
    },
    dataBisnis: {
      useLinKURData: false,
      namaUsaha: `${randomElement(NAMA_USAHA_PREFIX)} ${randomElement(NAMA_USAHA_SUFFIX)}`,
      jenisUsaha: randomElement(JENIS_USAHA),
      legalitas: randomElement(['SKTU', 'NIB', 'SIUP']),
      lamaUsaha: String(randomInt(1, 15)),
      omsetPerbulan: String(randomInt(5000000, 50000000)),
      alamatUsaha: `Jl. ${randomElement(['Raya', 'Utama', 'Makmur'])} ${randomElement(['Timur', 'Barat', 'Selatan'])} No. ${randomInt(1, 500)}`,
      provinsi: 'Jawa Tengah',
      kotaKabupaten: city,
      desa: `Kelurahan ${randomElement(['Makmur', 'Sejahtera', 'Jaya', 'Sentosa'])}`,
      kodePosUsaha: String(randomInt(10000, 99999)),
      jenisProduk: randomElement(JENIS_USAHA),
      deskripsiUsaha: 'Usaha yang bergerak di bidang perdagangan dan jasa',
      jumlahKaryawan: String(randomInt(1, 10)),
    },
    uploadDocuments: {
      fileKTP: null,
      fileSelfieKTP: null,
      fileKK: null,
      fileNPWP: null,
      fileSKTU: null,
    },
  };
}

export function generateDashboardApplications(count: number = 128): DashboardApplication[] {
  const applications: DashboardApplication[] = [];

  for (let i = 1; i <= count; i++) {
    const namaDepan = randomElement(NAMA_DEPAN);
    const namaBelakang = randomElement(NAMA_BELAKANG);
    const borrower = `${namaDepan} ${namaBelakang}`;
    const { kota, regional } = randomElement(KOTA_REGIONAL);
    const plafon = randomInt(5, 100) * 1000000; // 5jt - 100jt
    const loanType = randomElement(LOAN_TYPES);
    const jenisUsaha = randomElement(JENIS_USAHA);
    const namaUsaha = `${randomElement(NAMA_USAHA_PREFIX)} ${randomElement(NAMA_USAHA_SUFFIX)}`;
    const submittedAt = generateDateInPast(30); // Last 30 days

    // Status distribution: more in early stages
    let currentStep: ApplicationStatus;
    const rand = Math.random();
    if (rand < 0.15) currentStep = 'prescreening';
    else if (rand < 0.30) currentStep = 'submitted';
    else if (rand < 0.50) currentStep = 'in_review';
    else if (rand < 0.65) currentStep = 'kunjungan';
    else if (rand < 0.80) currentStep = 'approved';
    else if (rand < 0.90) currentStep = 'pencairan';
    else currentStep = 'rejected';

    const fullData = generateMockFullData(borrower, plafon, kota);

    applications.push({
      id: `APP-${String(10000 + i).padStart(6, '0')}`,
      cif: `CIF${String(100000 + i).padStart(7, '0')}`,
      borrower,
      nomorKTP: fullData.prescreening.profilNasabah.nomorKTP,
      nomorHP: fullData.prescreening.profilNasabah.nomorHP,
      email: fullData.prescreening.profilNasabah.email,
      city: kota,
      regional,
      plafon,
      loanType,
      submittedAt,
      currentStep,
      jenisUsaha,
      namaUsaha,
      fullData,
      notes: [],
      assignedTo: currentStep !== 'prescreening' ? randomElement(['Staff A', 'Staff B', 'Staff C']) : undefined,
    });
  }

  // Sort by submission date (newest first)
  return applications.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}
