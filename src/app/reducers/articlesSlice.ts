// articlesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { customFetch } from '../../service/apiService';

// Замените на ваш настоящий URL API, если переменная окружения не используется
const apiUrl = process.env.REACT_APP_API_URL; 

// Определяем тип для статьи
export interface Article {
  _id: string; // или другой подходящий тип, например, number
  title: string;
  content: string;
}

// Начальное состояние слайса
interface ArticlesState {
  articles: Article[];
  currentArticle: Article | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ArticlesState = {
  articles: [],
  currentArticle: null,
  status: 'idle',
  error: null,
};

// Async action to fetch all articles
export const fetchArticles = createAsyncThunk(
  'articles/fetchAll',
  async (_, thunkAPI) => {
    const response = await customFetch(`/articles`);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch articles');
    }

    return (await response.json()) as Article[];
  }
);

// Async action to fetch a single article by its ID
export const fetchArticleById = createAsyncThunk(
  'articles/fetchById',
  async (articleId: string, thunkAPI) => {
    const response = await customFetch(`/articles/${articleId}`);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || `Failed to fetch article with ID: ${articleId}`);
    }

    return (await response.json()) as Article;
  }
);

// Создаем слайс для статей
export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработка состояний для fetchArticles
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.status = 'succeeded';
        state.articles = action.payload; // Добавляем статьи из ответа в состояние
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      // Обработка состояний для fetchArticleById
      .addCase(fetchArticleById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
        state.status = 'succeeded';
        state.currentArticle = action.payload; // Добавляем текущую статью в состояние
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default articlesSlice.reducer;
