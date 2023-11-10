import { ProductQueryParams } from "../app/reducers/catalogSlice";

export default function extractParamsFromURL(url: string) {
    const params: ProductQueryParams = {};
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