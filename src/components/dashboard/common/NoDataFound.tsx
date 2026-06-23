const NoDataFound = ({
  useImage,
  children
}: {
  useImage?: boolean;
  children: React.ReactNode
}) => {
  return (
    <div className="mt-2 py-4 2xl:py-5 px-4 flex flex-col items-center justify-center w-full h-fit bg-white border border-[#A9A9A9] rounded-2xl">
      {useImage &&
        <img src="/not-found-data.webp" alt="Not Found" 
          className="w-60 h-auto object-contain"
        />
      }
      <div className="text-center">
        <p className="text-black/80 text-base 2xl:text-xl">
          {children}
        </p>
      </div>
    </div>
  )
}

export default NoDataFound;
