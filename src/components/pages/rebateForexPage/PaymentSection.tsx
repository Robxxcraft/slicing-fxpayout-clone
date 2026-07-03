import Table from "@/components/TableLayout";
import { useTranslation } from "react-i18next";

const payments = [
  {
    methodTranslate: "claimrebatepage:payment.tableItems.0.method",
    minimum: "$10.00", 
    currency: "-", 
    costTranslate: "claimrebatepage:payment.tableItems.0.cost"
  },
  {
    methodTranslate: "claimrebatepage:payment.tableItems.1.method",
    minimum: "$1.00", 
    currency: "IDR", 
    costTranslate: "claimrebatepage:payment.tableItems.1.cost"
  },
  {
    methodTranslate: "claimrebatepage:payment.tableItems.2.method",
    minimum: "$1.00", 
    currency: "IDR", 
    costTranslate: "claimrebatepage:payment.tableItems.2.cost"
  },
  {
    methodTranslate: "claimrebatepage:payment.tableItems.3.method",
    minimum: "$5.00", 
    currency: "USD", 
    costTranslate: "claimrebatepage:payment.tableItems.3.cost"
  },
  {
    methodTranslate: "claimrebatepage:payment.tableItems.4.method",
    minimum: "$5.00", 
    currency: "USD", 
    costTranslate: "claimrebatepage:payment.tableItems.4.cost"
  },
  {
    methodTranslate: "claimrebatepage:payment.tableItems.5.method",
    minimum: "$5.00", 
    currency: "USD", 
    costTranslate: "claimrebatepage:payment.tableItems.5.cost"
  },
];

const PaymentSection = ({
  sectionsRef
}: {
  sectionsRef: React.RefObject<Record<string, HTMLElement | null>>
}) => {
  const { t } = useTranslation(["claimrebatepage"])
  return (
    <section
      id="payment"
      ref={el => {sectionsRef.current["payment"] = el}}
      className="pt-8 md:pt-10 xl:pt-20 scroll-mt-[66px] lg:scroll-mt-9 border-t xl:border-0 border-[#E5E5E5]"
    >
      <div className="px-6 md:px-11 xl:px-0 xl:pe-24 2xl:pe-56">
        <h2 className="font-medium text-2xl md:text-[2rem] 2xl:text-[2.5rem]">
          {t("claimrebatepage:payment.title")}
        </h2>
        <p className="mt-6 text-xl 2xl:text-2xl leading-[169.2%]">
          {t("claimrebatepage:payment.paragraph")}
        </p>
        <Table>
          <Table.Heading>
            {[
              t("claimrebatepage:payment.tableHeaders.0"),
              t("claimrebatepage:payment.tableHeaders.1"),
              t("claimrebatepage:payment.tableHeaders.2"),
              t("claimrebatepage:payment.tableHeaders.3"),
            ].map((item, idx) => (
              <Table.HeadingItem key={idx}>{item}</Table.HeadingItem>
            ))}
          </Table.Heading>

          <Table.Body>
            {payments.map((row, rowIdx) => (
              <Table.Row key={rowIdx}>
                {Object.values(row).map((value, collIdx) => (
                  <Table.Cell key={collIdx} rowIndex={rowIdx} className={`${collIdx === 3 && "text-nowrap"}`}>
                    {t(value)}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </section>
  )
}

export default PaymentSection;
