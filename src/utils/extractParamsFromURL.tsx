export default function extractParamsFromURL(url: string) {
    const params: { [key: string]: string | number } = {};
    const searchParams = new URLSearchParams(url.split('?')[1]);
  
    searchParams.forEach((value, key) => {
      if (typeof value === 'string' && !isNaN(Number(value))) {
        params[key] = Number(value);
      } else {
        params[key] = value;
      }
    });
  
    return params;
  };