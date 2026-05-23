export function parseBrowser(ua: string): string {
  if (/Edg\//.test(ua))                             return 'Edge';
  if (/Chrome\//.test(ua) && /Safari\//.test(ua))   return 'Chrome';
  if (/Firefox\//.test(ua))                         return 'Firefox';
  if (/Safari\//.test(ua))                          return 'Safari';
  return 'Other';
}

export function parseDevice(ua: string): string {
  if (/iPhone/.test(ua))             return 'iPhone';
  if (/iPad/.test(ua))               return 'iPad';
  if (/Android/.test(ua))            return 'Android';
  if (/Windows/.test(ua))            return 'Windows';
  if (/Macintosh|Mac OS X/.test(ua)) return 'Apple';
  return 'Other';
}

export function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, '').replace(/[=+\-@\t\r]/g, '').trim();
}

export function saudiNow(): { date: string; time: string } {
  const now   = new Date();
  const saudi = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }));
  const pad   = (n: number) => String(n).padStart(2, '0');
  return {
    date: `${pad(saudi.getDate())}/${pad(saudi.getMonth() + 1)}/${saudi.getFullYear()}`,
    time: `${pad(saudi.getHours())}:${pad(saudi.getMinutes())}:${pad(saudi.getSeconds())}`,
  };
}
