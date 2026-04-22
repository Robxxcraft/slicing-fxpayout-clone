export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (navigator.clipboard && window.isSecureContext) { 
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true
    } catch (err) {
      console.error(`Fallback ${err}`);
      return false;
    }
}
