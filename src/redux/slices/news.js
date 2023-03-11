import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { newsIdsURL } from '../../api/api';

export const fetchNews = createAsyncThunk('/fetchNews', async () => {
	const data = await fetch(newsIdsURL).then(data => data.json());
	return data;
});

const initialState = {
	news: [],
	status: 'loading',
};

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchNews.pending]: state => {
			state.news = [];
			state.status = 'loading';
		},
		[fetchNews.fulfilled]: (state, action) => {
			state.news = action.payload;
			state.status = 'loaded';
		},
		[fetchNews.rejected]: state => {
			state.news = [];
			state.status = 'error';
		},
	},
});

export const newsReducer = newsSlice.reducer;
