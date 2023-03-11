import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import CommentIcon from '@mui/icons-material/Comment';
import { baseURL } from '../../api/api';
import { DataType } from '../../types/types';
import CommentsList from '../Comments/CommentsList';
import styles from '../News/News.module.css';
import { Box, Button, Skeleton } from '@mui/material';

const NewsItem: FC = () => {
	const { id } = useParams();
	const [news, setNews] = useState<DataType>();

	const fetchData = async () => {
		const data: DataType = await fetch(
			`${baseURL}/item/${id}.json`
		).then(data => data.json());
		setNews(data);
	};

	useEffect(() => {
		fetchData();
	}, [news]);

	return (
		<>
			{news ? (
				<div>
					<Link to='/'>
						<Button
							variant='outlined'
							color='secondary'
							sx={{ marginBottom: '10px' }}
						>
							Back
						</Button>
					</Link>

					<div className={styles.newsInfo}>
						<div className={styles.block}>
							<p className={styles.newsTitle}>{news?.title}</p>
							<span>{new Date(news?.time * 1000).toLocaleDateString()}</span>
						</div>
						<div className={styles.block}>
							<Link to={news?.url} className={styles.newsLink}>
								{news?.url}
							</Link>
							<div className={styles.alignBottom}>
								<StarIcon sx={{ color: 'orange' }} /> {news?.score}
							</div>
						</div>
						<div className={styles.block}>
							<span className={styles.author}>
								Author: <span>{news?.by}</span>
							</span>
							<div className={styles.alignBottom}>
								<CommentIcon />
								<span>{news?.kids?.length ? news?.kids?.length : '0'}</span>
							</div>
						</div>
					</div>
					{news?.kids ? (
						<CommentsList comments={news?.kids} />
					) : (
						<p>Comments list is empty</p>
					)}
				</div>
			) : (
				<Box
					width={1150}
					height={140}
					sx={{ padding: '20px', marginTop: '30px' }}
				>
					<Skeleton
						animation='wave'
						variant='rounded'
						width={850}
						height={24}
						sx={{ marginBottom: '10px' }}
					/>
					<Skeleton
						animation='wave'
						variant='rounded'
						width={850}
						height={24}
						sx={{ marginBottom: '10px' }}
					/>
					<Skeleton
						animation='wave'
						variant='rounded'
						width={650}
						height={36}
					/>
				</Box>
			)}
		</>
	);
};

export default NewsItem;
