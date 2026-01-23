const LongArrowLine = ({ widthLine }: { widthLine: number }) => {
  return (
    <div 
      className='relative mt-3 flex h-[58px] items-start' 
      style={{ width: `${widthLine}px` }}
    >
      <svg
        className="absolute top-0 left-0 z-10"
        width="112"
        height="58"
        viewBox="0 0 112 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="mask_left" maskUnits="userSpaceOnUse" x="0" y="0" width="90" height="58" style={{ maskType: "alpha" }}>
          <path
            d="M106.03 51.8653C106.03 54.8108 108.418 57.1986 111.363 57.1986C114.309 57.1986 116.697 54.8108 116.697 51.8653C116.697 48.9198 114.309 46.5319 111.363 46.5319C108.418 46.5319 106.03 48.9198 106.03 51.8653ZM6.65617 53.7071C7.0467 54.0976 7.67986 54.0976 8.07039 53.7071L14.4343 47.3431C14.8249 46.9526 14.8249 46.3195 14.4343 45.9289C14.0438 45.5384 13.4107 45.5384 13.0201 45.9289L7.36328 51.5858L1.70643 45.9289C1.3159 45.5384 0.682738 45.5384 0.292213 45.9289C-0.0983109 46.3195 -0.0983109 46.9526 0.292213 47.3431L6.65617 53.7071ZM111.363 51.8653H112.363V25H111.363H110.363V51.8653H111.363ZM87.3633 1V0H31.3633V1V2H87.3633V1ZM7.36328 25H6.36328V53H7.36328H8.36328V25H7.36328ZM31.3633 1V0C17.5562 0 6.36328 11.1929 6.36328 25H7.36328H8.36328C8.36328 12.2975 18.6607 2 31.3633 2V1ZM111.363 25H112.363C112.363 11.1929 101.17 0 87.3633 0V1V2C100.066 2 110.363 12.2975 110.363 25H111.363Z"
            fill="url(#p_left_0)"
          />
        </mask>
        <g mask="url(#mask_left)">
          <rect x="-11.6367" y="-23" width="130" height="100" fill="url(#p_left_1)" />
        </g>
        <defs>
          <linearGradient id="p_left_0" x1="104.988" y1="-0.881593" x2="112.592" y2="67.9242" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4160FF" /><stop offset="1" stopColor="#213269" />
          </linearGradient>
          <linearGradient id="p_left_1" x1="82.2329" y1="-26.6184" x2="110.457" y2="101.078" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4160FF" /><stop offset="1" stopColor="#213269" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="absolute top-0"
        style={{ left: '80px', width: `${widthLine - 160}px` }} // Offset agar overlap sedikit dengan ujung
        height="2"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="2" fill="#4160FF" /> 
      </svg>

      <svg
        className="absolute top-0 right-0 z-10"
        width="109"
        height="58"
        viewBox="0 0 109 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="mask_right" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="-8" y="0" width="117" height="58">
          <path
            d="M97.6667 51.8653C97.6667 54.8108 100.054 57.1986 103 57.1986C105.946 57.1986 108.333 54.8108 108.333 51.8653C108.333 48.9198 105.946 46.5319 103 46.5319C100.054 46.5319 97.6667 48.9198 97.6667 51.8653ZM-0.707107 53.7071C-0.316583 54.0976 0.316583 54.0976 0.707107 53.7071L7.07107 47.3431C7.46159 46.9526 7.46159 46.3195 7.07107 45.9289C6.68054 45.5384 6.04738 45.5384 5.65685 45.9289L0 51.5858L-5.65685 45.9289C-6.04738 45.5384 -6.68054 45.5384 -7.07107 45.9289C-7.46159 46.3195 -7.46159 46.9526 -7.07107 47.3431L-0.707107 53.7071ZM103 51.8653H104V25H103H102V51.8653H103ZM79 1V0H24V1V2H79V1ZM0 25H-1V53H0H1V25H0ZM24 1V0C10.1929 0 -1 11.1929 -1 25H0H1C1 12.2975 11.2974 2 24 2V1ZM103 25H104C104 11.1929 92.8071 0 79 0V1V2C91.7025 2 102 12.2975 102 25H103Z"
            fill="url(#p_right_0)"
          />
        </mask>
        <g mask="url(#mask_right)">
          <rect x="25.75" y="-23" width="91.9643" height="100" fill="url(#p_right_1)" />
        </g>
        <defs>
          <linearGradient id="p_right_0" x1="96.6857" y1="-0.881593" x2="104.362" y2="67.908" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4160FF" /><stop offset="1" stopColor="#213269" />
          </linearGradient>
          <linearGradient id="p_right_1" x1="112.077" y1="-26.6184" x2="142.508" y2="100.002" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4160FF" /><stop offset="1" stopColor="#213269" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default LongArrowLine;
