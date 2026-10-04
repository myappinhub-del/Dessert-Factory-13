/**
 * Social sharing utility helpers for Dessert Factory @13
 */

export interface ShareData {
  title: string;
  text: string;
  url: string;
  itemName?: string;
  price?: number;
  reviewAuthor?: string;
}

export const getAppShareUrl = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.href.split('?')[0];
  }
  return 'https://dessertfactory13.in';
};

export const createWhatsAppShareUrl = (message: string, url: string): string => {
  const text = `${message}\n\n📍 Link: ${url}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
};

export const createTwitterShareUrl = (text: string, url: string): string => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=DessertFactory13,VijayawadaFoodies,DubaiChocolate`;
};

export const createFacebookShareUrl = (url: string): string => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
};

export const createTelegramShareUrl = (text: string, url: string): string => {
  return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
};

export const createSmsUrl = (phoneNumber: string, message: string): string => {
  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
  return `sms:${cleanPhone}?body=${encodeURIComponent(message)}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error("Clipboard copy failed", err);
    return false;
  }
};
