import type { UserGender } from "@/types/user.type";

export type UserWithdrawalProps = {
  full_name: string;
  username: string;
  gender: UserGender;
  phone_number: string;
  email: string;
  isLoading: boolean;
};
const UserWithdrawalDrawer = ({
  full_name,
  username,
  gender,
  phone_number,
  email,
  isLoading
}: UserWithdrawalProps) => {
  const profileData = [
    { 
      title: "Username",
      content: username
    },
    { 
      title: "Nama Lengkap",
      content: full_name
    },
    { 
      title: "Jenis Kelamin",
      content: gender === "male" ? "Laki-laki" : "Perempuan"
    },
    { 
      title: "Nomor Telp",
      content: phone_number
    },
    { 
      title: "Alamat Email",
      content: email
    },
  ];

  return (
    <div className="py-5 w-full rounded-xl border border-[#777777] bg-white">
      <div className="px-4 pb-4 flex items-center justify-between border-b border-[#EAEAEA]">
        <p className="uppercase text-base font-bold 2xl:text-xl bg-linear-to-t from-dark-primary to-primary bg-clip-text text-transparent">
          USER information
        </p>
      </div>
      <div className="px-4 pt-4 grid grid-cols-2 gap-5">
        {profileData.map((item) => {
          if (isLoading) {
            return  (
              <div
                key={item.title}
                className="space-y-2 animate-pulse"
              >
                <div className="h-3 w-[30%] bg-gray-300 rounded-full"></div>
                <div className="h-3 w-full bg-gray-300 rounded-full"></div>
              </div>
            )
          }
          return (
          <div key={item.title} className="space-y-2">
            <p className="text-sm 2xl:text-lg font-medium text-black/60">{item.title}</p>
            {item.title === "Alamat Email" ? 
              <div className="flex items-center gap-2">
                <p className="text-sm 2xl:text-xl font-medium text-black">{item.content}</p>
                <img src="/check.svg" alt="check icon"
                  className="mt-px scale-80 2xl:scale-100"
                />
              </div>
            : <p className="text-sm 2xl:text-xl font-medium text-black">{item.content}</p>
            }
          </div>
        )})}
      </div>
    </div>
  )
}

export default UserWithdrawalDrawer;
