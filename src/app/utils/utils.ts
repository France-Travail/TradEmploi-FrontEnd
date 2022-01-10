import { Parser } from 'json2csv';

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

export const exportCsv = (data: any[], name: string) => {

  const json2csvParser = new Parser({ delimiter: ';', encoding: 'utf8' });
  const csv = (data && data.length > 0) ? json2csvParser.parse(data) : '';
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  const date = new Date().toLocaleDateString('ko-KR').replace(/. /g, '');
  a.setAttribute('download', `${name}${date}.csv`);
  document.body.append(a);
  a.click();
  document.body.removeChild(a);
};
