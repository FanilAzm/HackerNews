import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CommentIcon from '@mui/icons-material/Comment';
import CircularProgress from '@mui/material/CircularProgress';
import { useTimeConvert } from '../../hooks/useTimeConvert';
import { DataType } from '../../types/types';
import styles from './News.module.css';

type PropsType = {
	news: DataType[];
};

const News: FC<PropsType> = ({ news }) => {
	return (
		<div className={styles.news}>
			{news.length ? (
				<>
					{news.map((item, index) => {
						const date = useTimeConvert(item?.time);

						return (
							<div key={index} className={styles.newsItem}>
								<div className={styles.block}>
									<h4>
										{index + 1}. <Link to={`/${item?.id}`}>{item?.title}</Link>
									</h4>
									<div className={styles.block}>
										<div className={styles.alignBottom}>
											<CommentIcon />
											{item?.kids?.length ? item?.kids?.length : '0'}
										</div>
										<div className={styles.alignBottom}>
											<StarIcon sx={{ color: 'orange' }} /> {item?.score}
										</div>
									</div>
								</div>
								<div className={styles.block}>
									<div className={styles.author}>
										Author: <span>{item?.by}</span>
									</div>
									<span>{date}</span>
								</div>
							</div>
						);
					})}
				</>
			) : (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			)}
		</div>
	);
};

export default News;
