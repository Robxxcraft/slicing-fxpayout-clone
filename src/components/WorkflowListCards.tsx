import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";
import { FaShieldAlt } from "react-icons/fa";
import { FaArrowRightLong, FaBuildingShield, FaChartLine, FaChevronDown, FaCoins, FaUserPlus, FaWallet } from "react-icons/fa6";
import { Link } from "react-router-dom";

const workflows = [
  {
    icon: <FaUserPlus className="text-2xl" />,
    title: "Buat Akun FXPayout",
    description: "Daftar akun FXPayout",
    details: ["Buat akun FXPayout menggunakan email yang sama dengan email yang terdaftar pada broker agar proses verifikasi lebih mudah. Setelah berhasil mendaftar, Anda dapat mengakses Dashboard Trader untuk mengelola akun trading, rebate, dan withdrawal."],
    info: "Gunakan email yang sama dengan akun broker.",
    translateKey: "homepage:howItWorks.workflows.0"
  },
  {
    icon: <FaBuildingShield className="text-2xl" />,
    title: "Daftar Broker melalui FXPayout",
    description: "Hubungkan akun broker Anda",
    details: ["Daftarkan broker melalui halaman resmi Broker FXPayout. Setelah akun broker berhasil dibuat, buka Dashboard Trader -> Broker kemudian tambahkan broker dan nomor akun trading MT4/MT5."],
    info: "Pastikan broker dan nomor akun benar.",
    translateKey: "homepage:howItWorks.workflows.1"
  },
  {
    icon: <FaShieldAlt className="text-2xl" />,
    title: "Tunggu Proses Validasi",
    description: "Admin memverifikasi akun trading",
    details: ["Tim FXPayout akan memverifikasi apakah akun trading sudah berada di bawah jaringan IB FXPayout.", 
        ["⏳ Menunggu Verifikasi", "✅ Berhasil Terhubung", "❌ Gagal Verifikasi"]
    ],
    info: "Trading dapat dimulai setelah akun berhasil tervalidasi.",
    translateKey: "homepage:howItWorks.workflows.2"
  },
  {
    icon: <FaWallet className="text-2xl" />,
    title: "Tambahkan Wallet Withdrawal",
    description: "Atur metode pencairan rebate",
    details: ["Masuk ke menu Wallet / Withdrawal kemudian tambahkan metode pembayaran.", [
      "⏳ 🏦 Bank Lokal", "💳 E-Wallet", "🪙 USDT (BEP-20 / BNB Smart Chain)"
    ]],
    info: "Wallet ini digunakan saat melakukan withdrawal rebate.",
    translateKey: "homepage:howItWorks.workflows.3"
  },
  {
    icon: <FaChartLine className="text-2xl" />,
    title: "Trading Seperti Biasa",
    description: "Trading tanpa perubahan strategi",
    details: ["Lanjutkan trading seperti biasa. Broker akan mengirim komisi IB kepada FXPayout dan sistem secara otomatis menghitung rebate berdasarkan volume trading."],
    info: "Seluruh rebate dapat dipantau melalui Dashboard Trader.",
    translateKey: "homepage:howItWorks.workflows.4"
  },
  {
    icon: <FaCoins className="text-2xl" />,
    title: "Terima & Tarik Rebate",
    description: "Rebate siap dicairkan",
    details: ["Setelah rebate tersedia, lakukan withdrawal menggunakan metode pembayaran yang telah ditambahkan sebelumnya. Jika mengalami kendala seperti:", [
      "• Rebate belum masuk", "• Withdrawal tertunda", "• Akun belum tervalidas", "• Status belum berubah"
    ]],
    info: "Rebate hanya berlaku untuk akun yang berada di bawah jaringan IB FXPAYOUT.",
    translateKey: "homepage:howItWorks.workflows.5"
  },
];

const WorkflowListCards = ({
  sizeWindow
}: {
  sizeWindow: "small" | "normal"
}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className={`mt-8 3xl:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6
      ${sizeWindow === "normal" ? "xl:grid-cols-3" : ""}
    `}>
      {workflows.map((item, index) => {
        const details = t(`${item.translateKey}.details`, {
          returnObjects: true
        }) as string[] | string[][];
        return (
          <article key={index}
            className="relative p-6 3xl:p-8 bg-linear-to-br from-white to-[#F6F9FF] border border-[rgba(34,34,34,0.08)] rounded-[28px] shadow-[0_8px_24px_0_rgba(33,50,105,0.08)]"
          >
            {[2,5].includes(index) ? <></> :
            <>
              <div className="hidden xl:block absolute top-15 -end-3 w-6 h-px bg-primary/25" />
              <span className="hidden xl:block absolute top-[54px] -end-3.5 size-1.5 rounded-full bg-primary/40"></span>
            </>
            }
            {[0,1,2].includes(index) &&
              <>
                <div className="hidden xl:block absolute -bottom-3 start-15 h-6 w-px bg-primary/20" />
                <span className="hidden xl:block absolute -bottom-3.5 start-[54px] size-1.5 rounded-full bg-primary/35"></span>
              </>
            }
            
            {/* HEADER */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center justify-center size-14 rounded-2xl bg-linear-to-t from-dark-primary to-primary text-white">
                {item.icon}
              </div>
              <div className="shrink-0 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-sm font-semibold text-primary">
                  0{index + 1}
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <h2 className="mt-5 text-xl md:text-2xl font-semibold leading-[136%] text-[#222222]">
              {t(`${item.translateKey}.title`)}
            </h2>
            <p className="mt-2 text-base md:text-lg text-[#222222]/80 leading-[160%]">
              {t(`${item.translateKey}.description`)}
            </p>
            <details className="group mt-4 rounded-2xl bg-white/70 border border-[#E7EDFF]">
              <summary className="p-4 flex items-center justify-between gap-3 cursor-pointer">
                <p className="text-sm md:text-base font-medium text-primary">
                  {t("homepage:howItWorks.see_detail")}
                </p>
                <FaChevronDown className="text-primary group-open:rotate-180 transition-transform duration-300" />
              </summary>
              <div className="pb-4 px-4 space-y-3">
                {details.length === 1 ? 
                  <p className="text-sm md:text-base text-[#222222]/80 leading-[160%]">
                    {details[0]}
                  </p>
                :
                  details.map((itemDetail, idx) => {
                    if (Array.isArray(itemDetail)) {
                      return (
                        <ul key={idx}>
                          {itemDetail.map((detail, i) => (
                            <li key={i} className="text-sm md:text-base text-[#222222]/80 leading-[160%]">{detail}</li>
                          ))}
                        </ul>
                      )
                    }
                    return (
                      <p key={idx} className="text-sm md:text-base text-[#222222]/80 leading-[160%]">
                        {itemDetail}
                      </p>
                    )
                  })
                }
              </div>
            </details>
            {index === 1 &&
              <Link
                to={getLocalizedPath("broker", i18n.language)}
                className="mt-4 inline-flex items-center gap-2 text-sm md:text-base font-medium text-primary hover:underline"
              >
                {t("homepage:howItWorks.open_broker")}
                <FaArrowRightLong />
              </Link>
            }
            <div className="mt-4 px-3 py-2 rounded-xl bg-primary/8 border border-primary/15">
              <p className="text-sm md:text-base text-primary font-medium">
                {t(`${item.translateKey}.info`)}
              </p>
            </div>
          </article>
      )})}
    </div>
  )
}

export default WorkflowListCards;
