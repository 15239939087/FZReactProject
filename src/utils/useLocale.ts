import { useContext } from 'react';
import { GlobalContext } from '../context';
import defaultLocale from '../locale';

function useLocale(locale = null) {
  console.log(GlobalContext);
  
  const { lang } = useContext(GlobalContext);

  console.log(lang, locale);
  
  return (locale || defaultLocale)[lang] || {};
}

export default useLocale;
