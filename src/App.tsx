import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import News from './components/News/News';
import NewsItem from './components/NewsItem/NewsItem';
import { DataType } from './types/types';
import { baseURL, newsIdsURL } from './api/api';
import Header from './components/Header/Header';

function App() {
	const [news, setNews] = useState<DataType[]>([]);
	const [fetched, setFetched] = useState(false);
	const [fetching, setFetching] = useState(false);

	useEffect(() => {
		fetchData();
	}, [fetched]);

	const fetchData = async () => {
		if (!fetching) {
			setFetching(true);
			const newsIds = await fetch(newsIdsURL).then(data => data.json());

			const newsData: DataType[] = await Promise.all(
				newsIds.map((articleId: number) => {
					return fetch(`${baseURL}/item/${articleId}.json`).then(data =>
						data.json()
					);
				})
			);

			setNews(newsData);
			setFetched(true);
			setFetching(false);
		}
	};

	return (
		<BrowserRouter>
			<Header updateData={fetchData} fetching={fetching} />
			<Container maxWidth='lg' sx={{ margin: '30px auto' }}>
				<Routes>
					<Route path='/' element={<News news={news} />} />
					<Route path='/:id' element={<NewsItem />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
}

export default App;
