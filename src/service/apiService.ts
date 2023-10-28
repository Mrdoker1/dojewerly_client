import store from '../app/store'; // Путь к вашему хранилищу Redux
import { setSessionExpired } from '../app/reducers/authSlice'; // Путь к вашему экшену logoutUser

// Ваши настройки окружения для API URL
const apiUrl = process.env.REACT_APP_API_URL as string; // Утверждаем, что это строка, если вы уверены, что переменная среды определена

// Определяем тип для параметров запроса. Вы можете расширить этот интерфейс, добавив другие возможные поля, используемые в вашем приложении.
interface FetchOptions {
    method?: string;
    headers?: HeadersInit;  // Изменим тип на HeadersInit, который является более обобщенным и соответствует ожиданиям
    body?: BodyInit | null;
    mode?: RequestMode;
    credentials?: RequestCredentials;
    cache?: RequestCache;
    redirect?: RequestRedirect;
    referrerPolicy?: ReferrerPolicy;
    // Добавьте другие свойства по мере необходимости
  }

export async function customFetch(
  endpoint: string, 
  options?: FetchOptions
) {
  const response = await fetch(`${apiUrl}${endpoint}`, options);

  if (response.status === 401) {
    // Если ответ 401, это может означать проблему с аутентификацией
    store.dispatch(setSessionExpired()); // Выполняем logout на уровне Redux
    throw new Error('Unauthorized');
  }

  return response; // Предполагаем, что ответ можно преобразовать в JSON
}
