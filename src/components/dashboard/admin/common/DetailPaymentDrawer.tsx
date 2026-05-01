import { FaCheck, FaCopy } from "react-icons/fa6";

type DetailPaymentProps = {
  method: "bank" | "crypto";
  onCopy: () => void;
  isCopied: boolean;
  secureWalletAddress: string;
  account_name: string;
  bank: string;
}

const layoutBank = {
  bank: "Bank",
  account_name: "Pemilik Rekening",
  wallet_address: "Nomor Rekening"
};

const DetailPaymentDrawer = ({
  method,
  onCopy,
  isCopied,
  secureWalletAddress,
  account_name,
  bank
}: DetailPaymentProps) => {
  return (
    <div className="py-5 w-full rounded-xl border border-[#777777] bg-white">
      <div className="px-4 pb-4 flex items-center justify-between border-b border-[#EAEAEA]">
        <p className="uppercase text-base font-bold 2xl:text-xl bg-linear-to-t from-dark-primary to-primary bg-clip-text text-transparent">
          PAYMENT METHODS
        </p>
        <p className="text-black/80 font-medium text-base 2xl:text-xl">
          {method === "bank" ? 
            "Bank Transfer" : "Crypto"
          }
        </p>
      </div>
      <div className="px-4 pt-4 grid grid-cols-2 gap-5">
        {method === "bank" ?
          <>
            {Object.entries(layoutBank).map(([key, value]) => {
            if (key === "wallet_address") {
              return (
                <div className="space-y-1">
                  <p className="text-sm 2xl:text-lg font-medium text-black/60">{value}</p>
                  <div className="flex items-center gap-3"> 
                    <p className="text-sm 2xl:text-xl font-medium text-black">
                      {secureWalletAddress}
                    </p>
                    <div
                      onClick={onCopy} 
                      className="p-2 text-black/60 hover:bg-[#F5F5F5] rounded-lg cursor-pointer transition-all duration-300">
                      {isCopied ? <FaCheck /> : <FaCopy />}
                    </div>
                  </div>
                </div>
              )
            }
            return (
              <div className="space-y-2">
                <p className="text-sm 2xl:text-lg font-medium text-black/60">{value}</p>
                <p className="text-sm 2xl:text-xl font-medium text-black">
                  {key === "bank" ? bank : key === "account_name" ? account_name : ""}
                </p>
              </div>
            )})}
          </> : 
          <>
            <div className="space-y-2">
              <p className="text-sm 2xl:text-lg font-medium text-black/60">Pemilik Wallet</p>
              <p className="text-sm 2xl:text-xl font-medium text-black">{account_name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm 2xl:text-lg font-medium text-black/60">Alamat Wallet</p>
              <div className="flex items-center gap-3"> 
                <p className="text-sm 2xl:text-xl font-medium text-black">
                  {secureWalletAddress}
                </p>
                <div
                  onClick={onCopy} 
                  className="p-2 text-black/60 hover:bg-[#F5F5F5] rounded-lg cursor-pointer transition-all duration-300">
                  {isCopied ? <FaCheck /> : <FaCopy />}
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default DetailPaymentDrawer;
