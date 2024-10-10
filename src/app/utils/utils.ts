import { Parser } from '@json2csv/plainjs';
import { DatePipe } from '@angular/common';
import CryptoJS from 'crypto-js';

export const isIOS = () => {
  return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
};

export const isAndroid = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // Vérifier les user agents des appareils mobiles
  return /android/i.test(userAgent);
};

const formatNumber = (n: any) => {
  return (n < 10 ? '0' : '') + n;
};

export const getDuration = (lastMessageTime: string, firstMessageTime: string) => {
  const l = lastMessageTime.split(':');
  const f = firstMessageTime.split(':');
  const nbSeconds =
    Number(l[0]) * 3600 +
    Number(l[1]) * 60 -
    (Number(f[0]) * 3600 + Number(f[1]) * 60);
  return `${formatNumber((nbSeconds / 3600) | 0)}h${formatNumber(((nbSeconds % 3600) / 60) | 0)}`;

};

// Fonction pour extraire le domaine de l'e-mail
export const extractDomain = (email: string) => {
  const atIndex = email.lastIndexOf('@');
  if (atIndex === -1) {
    return null;
  }
  return email.slice(atIndex + 1);
};

export const extractUsername = (email: string) => {
  return email.split('@')[0];
};

export const getHashedEmail = (email: string) => {
  const username = extractUsername(email);
  const domain = extractDomain(email);
  const hashedUsername = CryptoJS.SHA256(username).toString(CryptoJS.enc.Hex);
  return `${hashedUsername}@${domain}`;
};


export const exportCsv = (data: any[], name: string) => {

  const json2csvParser = new Parser({ delimiter: ';', withBOM: true });
  const csv = (data && data.length > 0) ? json2csvParser.parse(data) : '';
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  const date = new Date();
  const datepipe: DatePipe = new DatePipe('en-US');
  const formattedDate = datepipe.transform(date, 'YYYYMMdd');
  a.setAttribute('download', `${name}${formattedDate}.csv`);
  document.body.append(a);
  a.click();
  document.body.removeChild(a);
};
