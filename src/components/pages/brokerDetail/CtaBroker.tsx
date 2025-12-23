import { IoArrowForward } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import Button from "@/components/ui/Button";

const CtaBroker = ({name, websiteUrl}: {name: string; websiteUrl: string}) => {
  return (
    <section className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 pt-10 lg:pt-18 xl:pt-20">
      <div className="relative py-10 xl:py-14 2xl:py-[72px] px-4 xl:px-10 flex flex-col items-center justify-center bg-primary rounded-3xl text-center overflow-hidden">
        <div className="z-11 w-full flex flex-col items-center">
          <h2 className="text-2xl 2xl:text-[40px] font-bold text-white leading-[134%] max-w-full">
            Siap Trading Dengan {name}?
          </h2>
          <p className="mt-4 text-base 2xl:text-xl text-white leading-[160%] max-w-[620px]">
            Gunakan link khusus Anda untuk mengakses rebate terbaik dan kondisi trading profesional di {name}.
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-4 md:gap-3">
            <Button variant="primary-light" size="xl" icon={<IoArrowForward className="text-xl 2xl:text-2xl" />} iconPosition="right">
              Daftar Melalui FXPayout
            </Button>
            <Button variant="outline-light" buttonType="link" urlTo={websiteUrl} size="xl" icon={<FaExternalLinkAlt className="text-base 2xl:text-xl" />} iconPosition="right">
              Kunjungi Website Broker
            </Button>
          </div>
        </div>
        <img
          src="/circle-ornament.png"
          alt="ornament"
          className="absolute z-10 top-0 -left-[10%] -rotate-55 w-[600px]"
        />
      </div>
    </section>
  );
};

export default CtaBroker;
