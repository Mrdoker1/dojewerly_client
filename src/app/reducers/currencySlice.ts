import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AVAILABLE_CURRENCIES, DEFAULT_CURRENCY } from '../../constants';

export interface CurrencyState {
  currentCurrency: string;
  availableCurrencies: string[];
}

// Проверяем, есть ли валюта в localStorage
if (!localStorage.getItem('currency')) {
  // Если нет, устанавливаем 'USD' по умолчанию
  localStorage.setItem('currency', DEFAULT_CURRENCY);
}

// Ищем валюту в localStorage или используем 'USD' по умолчанию
const initialCurrency = localStorage.getItem('currency') || DEFAULT_CURRENCY;

const initialState: CurrencyState = {
  currentCurrency: initialCurrency,
  availableCurrencies: AVAILABLE_CURRENCIES
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      if (state.availableCurrencies.includes(action.payload)) {
        state.currentCurrency = action.payload;
        // Сохраняем выбранную валюту в localStorage
        localStorage.setItem('currency', action.payload);
      }
    },
  },
});

export const { setCurrency } = currencySlice.actions;

// Экспортируем список доступных валют и DEFAULT_CURRENCY для использования в других частях приложения
export const AVAILABLE_CURRENCIES_LIST = AVAILABLE_CURRENCIES;
export const DEFAULT_CURRENCY_CONST = DEFAULT_CURRENCY;

export default currencySlice.reducer;
