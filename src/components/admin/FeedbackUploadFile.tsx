import type { StatusImport } from "@/utils/adminUnit";

const FeedbackUploadFile = ({ 
  status,
  messages,
  countError
}: { 
  status: StatusImport;
  messages: string[];
  countError?: number
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        {status === "ERROR" ?
          <>
            <p className="text-my-red">
              Error uploading data
            </p>
            {countError !== undefined &&
              <div
                className="px-2 py-1 rounded-md border border-my-red/20 bg-my-red/20 text-my-red">
                <span className="whitespace-nowrap">
                  ditemukan {countError > 500 ? `> 500` : countError} error
                </span>
              </div> 
            }
          </> 
          : <p className="text-primary">
              Success upload data
            </p>
        }
      </div>
      <div className="mt-2 px-5 py-6 border border-black/40 rounded-2xl">
        <ol className="primary-scrollbar text-black/80 max-h-[260px] overflow-y-auto">
          {messages.map((item, idx) => (
            <li key={idx}>{idx + 1}. {item}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default FeedbackUploadFile;
