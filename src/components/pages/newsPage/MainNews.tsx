import Table from "@/components/TableLayout";
import HotNews from "./ui/HotNews";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { plainNews } from "@/utils/news";
import CardNews from "./ui/CardNews";
import { useTranslation } from "react-i18next";

const categories = [
  {
    keyTranslate: "latest",
    name: "Terbaru",
    count: 50,
    url: "#"
  },
  {
    keyTranslate: "popular",
    name: "Populer",
    count: 42,
    url: "#"
  },
  {
    keyTranslate: "breakingNews",
    name: "Breaking News",
    count: 33,
    url: "#"
  },
  {
    keyTranslate: "crypto",
    name: "Cripto",
    count: 12,
    url: "#"
  },
  {
    keyTranslate: "stocks",
    name: "Saham",
    count: 20,
    url: "#"
  },
  {
    keyTranslate: "commodity",
    name: "Komoditas",
    count: 8,
    url: "#"
  },
  {
    keyTranslate: "economy",
    name: "Ekonomi",
    count: 6,
    url: "#"
  },
  {
    keyTranslate: "company",
    name: "Perusahaan",
    count: 21,
    url: "#"
  },
  {
    keyTranslate: "world",
    name: "Dunia",
    count: 15,
    url: "#"
  },
  {
    keyTranslate: "others",
    name: "Lainnya",
    count: 50,
    url: "#"
  }
];

const MainNews = () => {  
  const { t } = useTranslation(["newspage"]);
  return (
    <section className="px-6 md:px-11 lg:px-18 xl:px-24 3xl:px-56 pt-10 md:pt-15 3xl:pt-20">
      <HotNews />

      <div className="pt-10 md:pt-15 3xl:pt-20 flex flex-col xl:flex-row items-center justify-between gap-6 md:gap-10 lg:gap-20 w-full">
        <div className="flex flex-col">
          {plainNews.map((item, idx) => (
            <div key={idx} 
              className={`${plainNews.length === idx + 1 ? "pt-6 md:pt-10 border-0" : "border-b"}
                ${idx === 0 ? "pb-6 md:pb-10" : ""}
                border-black/20`}>
              <CardNews item={item} />
            </div>
          ))}
        </div>
        <Table className="mt-0! min-w-full xl:min-w-[30%]">
          <Table.Heading>
            <Table.HeadingItem className="py-4! 3xl:py-6 text-nowrap text-lg! lg:text-base! 3xl:text-xl!">
              {t(`newspage:main.category`)}
            </Table.HeadingItem>
            <Table.HeadingItem className="py-4! 3xl:py-6 text-center! text-nowrap text-lg! lg:text-base! 3xl:text-xl!">
              {t(`newspage:main.totalNews`)}
            </Table.HeadingItem>
          </Table.Heading>

          <Table.Body>
            {categories.map((row, rowIdx) => (
              <Table.Row key={rowIdx}>
                <Table.Cell rowIndex={rowIdx} className="py-2! 3xl:py-4 text-lg! lg:text-base! 3xl:text-xl!">
                  {t(`newspage:category.${row.keyTranslate}`)}
                </Table.Cell>
                <Table.Cell rowIndex={rowIdx}>
                  <Link 
                    to="#" 
                    className="flex items-center justify-center gap-2 text-lg! lg:text-base! 3xl:text-xl! text-primary text-nowrap hover:underline">
                    <span>{row.count}</span>
                    <FaArrowRight size={16} className="rtl:scale-x-[-1]" />
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </section>
  )
}

export default MainNews;
