import UserContext from "@/context/UserContext";
import { useContext } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { TbGenderBigender } from "react-icons/tb";

type ProfileLayout = {
  icon: React.ReactNode,
  title: string;
  content: string;
};

const PreviewProfileUser = () => {
  const [authUser] = useContext(UserContext);
  const profileData: ProfileLayout[] = [
    { 
      icon: <FaUser className="text-base 3xl:text-xl text-black/60" />,
      title: "Username",
      content: authUser?.username || ""
    },
    { 
      icon: <FaUser className="text-base 3xl:text-xl text-black/60" />,
      title: "Nama Lengkap",
      content: authUser?.fullName || ""
    },
    { 
      icon: <TbGenderBigender className="text-2xl 3xl:text-3xl text-black/60" />,
      title: "Jenis Kelamin",
      content: authUser?.gender === "male" ? "Laki-laki" : authUser?.gender === "female" ? "Perempuan" : ""
    },
    { 
      icon: <IoIosMail className="text-xl 3xl:text-3xl text-black/60" />,
      title: "Alamat Email",
      content: authUser?.email || ""
    },
    { 
      icon: <FaPhoneAlt className="text-base 3xl:text-xl text-black/60" />,
      title: "Nomor Telp",
      content: authUser?.phoneNumber || ""
    },
  ];
  return (
    <div className="mt-4 md:mt-6 px-4 3xl:px-6 py-5 3xl:py-8 bg-white border border-[#EAEAEA] rounded-xl">
      <div className="flex flex-col gap-3 md:gap-2 3xl:gap-4">
        {profileData.map((data, idx) => (
          <div key={idx} className="flex items-center gap-4 md:gap-8">
            <div className="shrink-0 flex items-center gap-3 3xl:gap-4 w-1/2 md:w-[220px]">
              <p className="size-5 md:size-7 flex justify-center items-center">
                {data.icon}
              </p>
              <p className="font-medium text-sm md:text-base 3xl:text-xl text-black/60">{data.title}</p>
            </div>
            <div className="flex items-center gap-2 w-1/2 md:w-fit break-all">
              <p className="font-medium text-sm md:text-base 3xl:text-xl break-all">
                {data.title === "Nomor Telp" && "+"}
                {data.content}
              </p>
              {data.title === "Alamat Email" && authUser?.isVerified && 
                <img src="/check.svg" alt="check icon"
                  className="mt-px scale-80 3xl:scale-100"
                />
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PreviewProfileUser;
