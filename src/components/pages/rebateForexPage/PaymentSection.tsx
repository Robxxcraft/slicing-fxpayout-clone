import Table from "@/components/TableLayout";

const payments = [
  {
    method: "Cryptocurrencies", 
    minimum: "$10.00", 
    currency: "-", 
    cost: "Up to 3 USDT"
  },
  {
    method: "E-Wallet Indonesia", 
    minimum: "$1.00", 
    currency: "IDR", 
    cost: "$0",
  },
  {
    method: "Bank Indonesia", 
    minimum: "$1.00", 
    currency: "IDR", 
    cost: "$0",
  },
  {
    method: "Neteller", 
    minimum: "$5.00", 
    currency: "USD", 
    cost: "1.45% (Min. $0.59)",
  },
  {
    method: "Skrill / Neteller", 
    minimum: "$5.00", 
    currency: "USD", 
    cost: "4.4% + 0.3 USD",
  },
  {
    method: "PayPal", 
    minimum: "$5.00", 
    currency: "USD", 
    cost: "1.45% (Min. $0.59)",
  },
];

const PaymentSection = ({sectionsRef}: {sectionsRef: React.RefObject<Record<string, HTMLElement | null>>}) => {
  return (
    <section
      id="payment"
      ref={el => {sectionsRef.current["payment"] = el}}
      className="mt-10 lg:mt-18 xl:mt-20 scroll-mt-[136px] lg:scroll-mt-[120px]"
    >
      <h2 className="font-medium text-2xl md:text-[32px] 2xl:text-[40px]">
        Sistem Pembayaran Rebate
      </h2>
      <p className="mt-4 md:mt-6 text-base md:text-xl 2xl:text-2xl leading-[169.2%]">
        fxpayout menyediakan berbagai metode pembayaran rebate yang fleksibel dan mudah diakses. Anda dapat memilih metode pencairan sesuai preferensi, dengan minimum penarikan yang rendah dan proses yang transparan.
      </p>
      <Table>
        <Table.Heading>
          {["Metode", "Pembayaran Minimum", "Mata Uang", "Biaya"].map((item, idx) => (
            <Table.HeadingItem key={idx}>{item}</Table.HeadingItem>
          ))}
        </Table.Heading>

        <Table.Body>
          {payments.map((row, rowIdx) => (
            <Table.Row key={rowIdx}>
              {Object.values(row).map((value, collIdx) => (
                <Table.Cell key={collIdx} rowIndex={rowIdx} className={`${collIdx === 3 && "text-nowrap"}`}>
                  {value}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  )
}

export default PaymentSection;
