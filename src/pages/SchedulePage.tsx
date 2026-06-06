import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeaderSection from "@/components/HeaderSection";
import CtaSection from "@/components/CtaSection";
import Table from "@/components/TableLayout";
import { useParams } from "react-router-dom";
import { brokers } from "@/utils/dataBroker/brokers";
import NotFound from "./NotFound";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/helper/pathHelper";

type Schedule = {
  keyTranslation: string;
}

const scheduleItems: Schedule[] = [
  { keyTranslation: "schedulepage:tableItems.0" },
  { keyTranslation: "schedulepage:tableItems.1" },
  { keyTranslation: "schedulepage:tableItems.2" },
  { keyTranslation: "schedulepage:tableItems.3" },
]

const SchedulePage = () => {
  const { t, i18n } = useTranslation(["common", "schedulepage"])
  const { brokerId } = useParams();
  const broker = brokers[brokerId as keyof typeof brokers];
  
  if (!broker) {
    return <NotFound />
  }

  return (
    <div className="font-inter">
      <title>{t("schedulepage:helmet.title", { brokerName: broker.name })}</title>

      <Navbar active="Klaim Rebate" />
      <main>
        <HeaderSection 
          icon="/calendar-icon.svg" 
          badge={t("schedulepage:header.tag")}
          title={t("schedulepage:header.title")}
          titleHighlight={broker.name.toUpperCase()}
          flipTitle={i18n.language === "en"}
          paragraph={t("schedulepage:header.paragraph", { brokerName: broker.name })} />
        <section className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 mt-10 lg:mt-8 2xl:mt-10">
          <Table>
            <Table.Heading>
              <Table.HeadingItem>
                {t("schedulepage:tableHeader.0")}
              </Table.HeadingItem>
              <Table.HeadingItem>
                {t("schedulepage:tableHeader.1")}
              </Table.HeadingItem>
            </Table.Heading>
  
            <Table.Body>
              {scheduleItems.map(({ keyTranslation }, rowIdx) => (
                <Table.Row key={rowIdx}>
                  <Table.Cell rowIndex={rowIdx}>
                    {t(`${keyTranslation}.category`)}
                  </Table.Cell>
                  <Table.Cell rowIndex={rowIdx}>
                    {t(`${keyTranslation}.schedule`)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </section>
        <CtaSection 
          title={t("cta.title")}
          paragraph={t("cta.paragraph")}
          button={t("button.registerNow")}
          urlButton={getLocalizedPath("register", i18n.language)}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SchedulePage;
