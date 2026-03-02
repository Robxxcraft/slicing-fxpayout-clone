import { useEffect } from "react";

export default function TawkChat() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/698fe853f45fd51c3bd13918/1jhd272ms";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}