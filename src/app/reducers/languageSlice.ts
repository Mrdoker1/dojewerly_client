import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '../../language/i18n';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from '../../constants';

export interface LanguageState {
  currentLanguage: string;
  availableLanguages: string[];
}

// Проверяем, есть ли язык в localStorage
if (!localStorage.getItem('language')) {
  // Если нет, устанавливаем DEFAULT_LANGUAGE по умолчанию
  localStorage.setItem('language', DEFAULT_LANGUAGE);
}

// Ищем язык в localStorage или используем DEFAULT_LANGUAGE по умолчанию
const initialLanguage = localStorage.getItem('language') || DEFAULT_LANGUAGE;

const initialState: LanguageState = {
  currentLanguage: initialLanguage,
  availableLanguages: AVAILABLE_LANGUAGES
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      if (state.availableLanguages.includes(action.payload)) {
        state.currentLanguage = action.payload;
        // Сохраняем выбранный язык в localStorage
        localStorage.setItem('language', action.payload);
        i18n.changeLanguage(action.payload); // Уведомляем i18next о смене языка
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
