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
  return (
    formatNumber((nbSeconds / 3600) | 0) +
    'h' +
    formatNumber(((nbSeconds % 3600) / 60) | 0)
  );
};

