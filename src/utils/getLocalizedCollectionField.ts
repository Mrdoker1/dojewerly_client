import { Collection } from "../app/reducers/collectionsSlice";

type LocalizableCollectionFields = 'name' | 'description';

export const getLocalizedCollectionField = (
  collection: Collection, 
  field: LocalizableCollectionFields, 
  currentLanguage: string
): string => {
  const localizedData = collection.localization && collection.localization[currentLanguage];
  
  if (localizedData) {
    const value = localizedData[field];
    if (value !== undefined) {
      return value;
    }
  }

  if (field === 'name') {
    return collection.name;
  }

  if (field === 'description') {
    return collection.description;
  }

  return '';
};
