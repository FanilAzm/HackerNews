import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from './slices/news';

const store = configureStore({
	reducer: {
		news: newsReducer,
	},
});

export default store;
