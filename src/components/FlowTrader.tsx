import { useTranslation } from 'react-i18next';
import WorkflowListCards from './WorkflowListCards'
import { FaShieldAlt } from 'react-icons/fa'

const FlowTrader = ({
  sizeWindow
}: {
  sizeWindow: "small" | "normal"; 
}) => {
  const { t } = useTranslation(["homepage"]);
  return (
    <>
      <WorkflowListCards sizeWindow={sizeWindow} />
      <Notes />

      <div className="mt-4 p-6 md:p-8 rounded-3xl bg-my-red-100 border border-my-red-200">
        <h3 className="text-xl md:text-2xl font-semibold text-my-red-700">
          {t("homepage:howItWorks.warning.title")}
        </h3>
        <p className="mt-3 text-sm md:text-base text-[#222222]/85 leading-[160%]">
          {t("homepage:howItWorks.warning.paragraph")}
        </p>
      </div>
    </>
  )
}

export default FlowTrader;

function Notes() {
  const { t } = useTranslation(["homepage"]);
  const notes = t("homepage:howItWorks.notes.items", {
    returnObjects: true
  }) as string[];

  return (
    <div className="mt-8 3xl:mt-10 p-6 md:p-8 rounded-3xl bg-[#F9F9F9] border border-[rgba(34,34,34,0.08)]">
      <h3 className="text-xl md:text-2xl font-semibold text-[#222222]">
        {t("homepage:howItWorks.notes.title")}
      </h3>
      <div className="mt-4 space-y-2.5">
        {notes.map((note, index) => (
          <div key={index} className="flex items-start gap-2.5">
            <FaShieldAlt className="mt-1 shrink-0 text-primary" />
            <p className="text-sm md:text-base text-[#222222]/85 leading-[160%]">
              {note}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
