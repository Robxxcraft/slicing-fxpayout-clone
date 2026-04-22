import { useEffect } from "react";

export default function TawkChat({
  isShow
}: {
  isShow: boolean;
}) {
  useEffect(() => {
    if (!isShow) return;
    if (document.getElementById("tawk-chat-script")) return;

    const script = document.createElement("script");
    script.id = "tawk-chat-script";
    script.src = "https://embed.tawk.to/698fe853f45fd51c3bd13918/1jhd272ms";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, [isShow]);

  useEffect(() => {
    if (!window.Tawk_API) return;

    if (isShow) {
      window.Tawk_API.showWidget();
    } else {
      window.Tawk_API.hideWidget();
    }
  }, [isShow]);

  return null;
}