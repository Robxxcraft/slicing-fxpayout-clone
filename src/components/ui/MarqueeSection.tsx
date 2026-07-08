import { motion, useAnimationControls } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const MarqueeSection = ({ 
  children,
  variant = "transparent",
  speed
}: {
  children: React.ReactNode;
  variant?: "primary" | "transparent";
  speed: number;
}) => {
  const { i18n, t } = useTranslation(["homepage"]);
  const isRtl = i18n.dir() === "rtl";

  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  // Berapa kali grup diulang agar selalu menutupi layar + 1 grup cadangan
  const [repeat, setRepeat] = useState(2);
  const [groupWidth, setGroupWidth] = useState(0);

  // Konten satu grup — dipisah agar bisa dipetakan berulang kali.
  const Group = ({ measureRef }: { measureRef?: React.Ref<HTMLDivElement> }) => (
    <div ref={measureRef} className="flex flex-nowrap items-center">
      {children}
    </div>
  );

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const group = groupRef.current;
      if (!container || !group) return;

      const gW = group.getBoundingClientRect().width;
      const cW = container.getBoundingClientRect().width;
      if (gW === 0) return;

      // Butuh cukup grup agar total >= lebar layar + 1 grup (untuk loop mulus).
      const needed = Math.ceil(cW / gW) + 1;

      setGroupWidth(gW);
      setRepeat(needed);
    };

    measure();

    // Ukur ulang saat ukuran container berubah (resize / breakpoint).
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (groupRef.current) ro.observe(groupRef.current);

    // Ukur ulang setelah web-font selesai dimuat (lebar teks bisa berubah).
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => ro.disconnect();
    // Ukur ulang tiap ganti bahasa — inilah kunci agar semua locale seamless.
  }, [i18n.language, t]);

  useLayoutEffect(() => {
    if (groupWidth === 0) return;

    // Geser tepat SEBESAR SATU grup (dalam pixel), bukan persen.
    // Karena semua grup identik, setelah bergeser 1 grup tampilannya
    // kembali persis sama → sambungan tak terlihat.
    const distance = groupWidth;
    const duration = distance / speed;

    const from = 0;
    const to = isRtl ? distance : -distance;

    controls.set({ x: from });
    controls.start({
      x: to,
      transition: {
        ease: "linear",
        duration,
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [groupWidth, isRtl, controls, speed]);

  return (
    <div
      ref={containerRef}
      className={`select-none overflow-hidden w-full whitespace-nowrap
        ${variant === "primary" ? "bg-primary" : ""}
      `}
    >
      <motion.div
        className="flex items-center flex-nowrap w-max"
        animate={controls}
      >
        {Array.from({ length: repeat }).map((_, index) => (
          // Grup pertama dipakai sebagai acuan pengukuran (measureRef).
          <Group key={index} measureRef={index === 0 ? groupRef : undefined} />
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeSection;
