'use client';

interface SyaratKetentuanModalProps {
  onClose: () => void;
}

export default function SyaratKetentuanModal({ onClose }: SyaratKetentuanModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-foreground">Syarat dan Ketentuan</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground font-medium mb-4">
              Dengan menekan tombol "Setuju & Ajukan Pinjaman" di bawah ini, saya
              menyatakan hal-hal sebagai berikut:
            </p>

            <ol className="list-decimal list-inside space-y-4 text-foreground">
              <li className="leading-relaxed">
                Data dan informasi yang saya berikan dalam pengajuan ini adalah sesuai
                keadaan yang sebenar-benarnya.
              </li>

              <li className="leading-relaxed">
                Saya menyetujui bahwa PT. Bank Rakyat Indonesia (Persero), Tbk,
                selanjutnya disebut Bank, berwenang untuk:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                  <li>
                    Memeriksa kebenaran data yang saya sampaikan dalam pengajuan ini.
                  </li>
                  <li>
                    Mencari dan memperoleh keterangan dan referensi dari sumber manapun
                    dengan cara yang dianggap sah oleh Bank.
                  </li>
                  <li>
                    Menyetujui atau menolak pengajuan pinjaman saya berdasarkan analisa
                    Bank.
                  </li>
                  <li>
                    Tidak mengembalikan seluruh dokumen yang telah saya serahkan kepada
                    Bank.
                  </li>
                  <li>
                    Memberikan secara terbatas dan/atau tidak terbatas data yang telah
                    saya sampaikan dalam pengajuan ini kepada pihak ketiga dalam rangka
                    kepentingan pemrosesan pengajuan pinjaman.
                  </li>
                </ul>
              </li>

              <li className="leading-relaxed">
                Saya memahami dan mengerti bahwa Bank tidak berkewajiban untuk memberikan
                fasilitas kredit kepada saya hingga saya memenuhi semua persyaratan yang
                berlaku pada Bank dan telah menandatangani dokumen yang diperlukan Bank
                dalam pemberian kredit.
              </li>

              <li className="leading-relaxed">
                Apabila ternyata data dan informasi, serta pernyataan yang saya
                berikan/buat tidak sesuai dengan keadaan yang sebenarnya, maka segala
                risiko dan konsekuensi yang diakibatkannya menjadi sepenuhnya tanggung
                jawab saya.
              </li>
            </ol>

            <div className="mt-6 p-4 bg-warning/10 border border-warning rounded-lg">
              <p className="text-sm text-foreground">
                <strong>Catatan:</strong> Pastikan Anda membaca dan memahami seluruh
                syarat dan ketentuan di atas sebelum melanjutkan pengajuan pinjaman.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 px-6 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}
