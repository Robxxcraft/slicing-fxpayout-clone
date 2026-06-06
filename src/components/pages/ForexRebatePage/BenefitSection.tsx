import BadgeSection from "@/components/ui/BadgeSection";
import Button from "@/components/ui/Button";
import BoundedIcon from "../brokerDetail/ui/BoundedIcon";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";

const benefits = [
  "Tidak Menerima Deposit",
  "Tidak Memiliki Akses ke Akun Trading",
  "Rebate Hingga 80%",
  "Tidak Menampung Dana",
  "Dukungan Bantuan Responsif",
  "Sistem Transparan dan Konsisten"
];

const BenefitSection = () => {
  const { t, i18n } = useTranslation();
  return (
    <section className="mt-10 md:mt-15 2xl:mt-20 px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 py-10 md:py-15 xl:py-[120px] bg-[#F9F9F9]">
      <div className="flex flex-col items-center justify-center gap-4">
        <BadgeSection
          icon={
            <img src="/people_money.svg" alt="Reg broker" 
              className="scale-90 md:scale-100" />
        }>
          JANGAN SALAH PILIH
        </BadgeSection>
        <h2 className="text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%] text-center">
          Pilihan Utama Trader Profesional
        </h2>
        <p className="text-base md:text-xl leading-[160%] max-w-5xl text-center">
          Kami merekomendasikan platform dengan rekam jejak terbaik untuk keamanan dana dan kecepatan eksekusi.
        </p>
      </div>

      <div className="mt-6 md:mt-10 grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-10">

        <div className="px-6 md:px-8 lg:px-10 py-6 md:py-10 col-span-1 xl:col-span-8 bg-white border border-primary rounded-[40px]">
          <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-2 md:gap-10">
            <div className="flex gap-2 items-center">
              <img
                src="/fxpayout-blue.svg"
                alt="logo fx payout"
                className="mb-2 lg:mb-3 w-5 lg:w-6 2xl:w-8"
              />
              <span className="text-xl md:text-2xl 2xl:text-3xl font-bold text-primary">
                FXPAYOUT
              </span>
            </div>
            <div className="px-4 md:px-6 py-2 flex items-center gap-2 w-fit h-fit bg-primary rounded-full">
              <img src="/star-splash.svg" alt="Star" />
              <p className="text-sm text-white font-semibold leading-[200%]">
                Recommended
              </p>
            </div>
          </div>
          <p className="mt-6 text-base md:text-lg leading-[180%]">
            FXPayout adalah solusi all-in-one untuk trader yang mengutamakan transparansi. Kami bekerja sama langsung dengan penyedia likuiditas untuk memastikan Anda mendapatkan rate tertinggi.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 md:gap-4 items-center">
                <img src="/check.svg" alt="check icon"
                  className="mt-px scale-100"
                />
                <p className="text-lg font-semibold">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 py-4 px-5 bg-[#F4F6FA] rounded-lg shadow-[0_3px_13.1px_0_rgba(0,0,0,0.1)] border-l-10 border-primary">
            <p className="text-base font-medium text-black/70 leading-[192%]">
              FXPayout cocok untuk trader yang ingin mengurangi biaya trading tanpa menambah risiko tambahan.
            </p>
          </div>
        </div>

        <div className="px-6 md:px-8 lg:px-10 py-6 md:py-10 col-span-1 xl:col-span-4 flex flex-col justify-between bg-primary rounded-[40px]">
          <div>
            <BoundedIcon 
              icon={"/hand-money.svg"} 
              alt={"Money"}
              bgCL="bg-white"             
              paddingVariant="small" 
            />
            <div className="mt-4 space-y-2">
              <p className="text-xl md:text-2xl text-white font-semibold leading-[180%]">
                Dapatkan Rebate Tertinggi
              </p>
              <p className="text-lg text-white leading-[180%]">
                FXPayout adalah platform rebate forex yang menawarkan rebate hingga 95%
              </p>
            </div>
            <div className="mt-2 lg:mt-5">
              <div className="mb-2 flex justify-between items-end">
                <p className="text-base text-white leading-[180%]">
                  Rebate Hingga
                </p>
                <p className="text-[40px] md:text-[48px] text-white italic font-semibold">
                  95%
                </p>
              </div>
              <div className="relative w-full h-2 bg-black/10 rounded-ful">
                <div className="w-[95%] h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <Button
            variant="light"
            buttonType="link"
            urlTo={getLocalizedPath("register", i18n.language)}
            className="mt-6"
          >
            Coba Sekarang
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BenefitSection;
