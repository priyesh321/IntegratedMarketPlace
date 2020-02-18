import Cookies from 'universal-cookie';

const cookie = new Cookies();

export const setCookie = (value) => {
  const serviceViewArr = cookie.get('serviceListView') || [];
  if(value) {
    serviceViewArr.push(value);
  }
  cookie.set('serviceListView', JSON.stringify(serviceViewArr), { path: '/' });
}

export const getCookie = () => ({ serviceViewArr: cookie.get('serviceListView') || [], CookieConsent: cookie.get('CookieConsent') });

export const clearAllCookie = () => {
  const cookies = cookie.getAll();
  Object.keys(cookies).forEach(c => cookie.remove(c));
}

export const clearCookie = (value) => {
  cookie.remove(value)
}

export default { setCookie, getCookie, clearCookie, clearAllCookie };