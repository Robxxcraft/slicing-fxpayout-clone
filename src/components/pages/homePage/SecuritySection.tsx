import { useTranslation } from 'react-i18next';
import BoundedIcon from '../brokerDetail/ui/BoundedIcon';
import { TiInfoLarge } from 'react-icons/ti';

const contents = [
  {
    icon: "/not-allowed.svg",
    title: "FXPayout Bukan Broker",
    paragraph: "Kami tidak mengelola dana Anda. Semua transaksi tetap dilakukan langsung di broker resmi.",
    translateKey: "homepage:securitySection.contents.0"
  },
  {
    icon: "/no-money.svg",
    title: "Tidak Menerima Deposit",
    paragraph: "Kami tidak pernah meminta Anda untuk transfer dana. Semua aktivitas trading tetap di akun broker Anda.",
    translateKey: "homepage:securitySection.contents.1"
  },
  {
    icon: "/stop.svg",
    title: "Tidak Memiliki Akses Akun",
    paragraph: "Kami tidak memiliki akses ke akun trading dan tidak menyimpan data login Anda.",
    translateKey: "homepage:securitySection.contents.2"
  }
];

const SecuritySection = ({
  info
}: {
  info?: string;
}) => {
  const { t } = useTranslation(["homepage"]);
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 md:pt-14 xl:pt-[120px]">
      <div className="relative pt-[72px] pb-8 md:pb-[72px] px-6 md:px-10 lg:px-16 bg-primary rounded-3xl">
        <div className="py-2 ps-2 pe-4 absolute top-5 start-0 bg-my-green rounded-e-xl">
          <div className="absolute top-0 end-full w-1.5 h-11 bg-my-green rounded-s-lg"></div>
          <p className="uppercase text-base text-white font-bold">
            {t("homepage:securitySection.badge")}
          </p>
        </div>

        <h2 className="text-2xl md:text-[32px] 2xl:text-[40px] font-semibold md:font-bold leading-[132%] text-white">
          {t("homepage:securitySection.title")}
        </h2>
        <div className="relative z-99 mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {contents.map((item, index) => (
            <div key={index} style={{ order: index + 1 }}>
              <BoundedIcon 
                icon={item.icon} 
                alt={`Icon ${item.title}`} 
                bgCL="bg-white" 
                variant="fourth"
                paddingVariant="small"
              />
              <p className="mt-2 md:mt-5 text-xl font-semibold text-white">
                {t(`${item.translateKey}.title`)}
              </p>
              <p className="mt-2 md:mt-2.5 text-base text-white leading-6">
                {t(`${item.translateKey}.paragraph`)}
              </p>
            </div>
          ))}
          {info &&
            <div className="order-4 md:order-5 col-span-1 md:col-span-2 xl:col-span-4 relative z-99 mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
              <div className="col-span-3 px-6 py-4 flex items-start gap-4 w-full border border-dashed border-white rounded-[10px]">
                <div className="shrink-0 flex justify-center items-center size-6 rounded-full border border-white">
                  <TiInfoLarge className="text-base text-white" />
                </div>
                <p className="text-white text-base font-medium leading-[178%]">
                  {info}
                </p>
              </div>
            </div>
          }
          <div onContextMenu={() => false} className="order-5 md:order-4 block xl:hidden w-full max-w-[360px] select-none pointer-events-none">
            <img src="/secure-fxpayout.webp" alt="Secure FXPayout" 
              className="w-full object-contain"
            />
          </div>
        </div>
        <div onContextMenu={() => false} className="z-95 hidden xl:block absolute end-1 top-1/2 -translate-y-1/2 w-[320px] 2xl:w-[420px] select-none pointer-events-none">
          <img src="/secure-fxpayout.webp" alt="Secure FXPayout" 
            className="w-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default SecuritySection;
