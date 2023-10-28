import { Product } from "../app/reducers/productsSlice";

type LocalizableFields = 'name' | 'info' | 'price' | 'description' | 'stock';

export const getLocalizedField = (
  product: Product, 
  field: LocalizableFields, 
  currentLanguage: string
): string | number => {
  const localizedData = product.localization && product.localization[currentLanguage];
  
  if (localizedData) {
    const value = localizedData[field];
    if (value !== undefined) {
      return value;
    }
  }

  if (field === 'info') {
    return product.props.info;
  }

  if (field === 'name') {
    return product.name;
  }

  if (field === 'price') {
    return product.price;
  }

  if (field === 'description') {
    return product.props.description;
  }

  if (field === 'stock') {
    return product.stock;
  }

  return '';
};
