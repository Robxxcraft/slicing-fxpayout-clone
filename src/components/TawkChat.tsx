import { useEffect } from "react";

export default function TawkChat() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/698fda893a5ba51c3b88c287/1jhcuraj0";
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