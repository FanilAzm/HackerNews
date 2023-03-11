import { Box, CircularProgress } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { baseURL } from '../../api/api';
import { DataType } from '../../types/types';
import Comment from './Comment';

type PropsType = {
	comments?: number[] | undefined;
	child?: boolean;
};

const CommentsList: FC<PropsType> = ({ comments, child }) => {
	const [commentsList, setCommentsList] = useState<DataType[]>([]);

	useEffect(() => {
		fetchComments();
	}, [commentsList]);

	const fetchComments = async () => {
		const commentsData: DataType[] = await Promise.all(
			// @ts-ignore
			comments.map((id: number) => {
				return fetch(`${baseURL}/item/${id}.json?print=pretty`).then(data =>
					data.json()
				);
			})
		);

		setCommentsList(commentsData);
	};

	return (
		<div>
			{!child && <h4>Comments</h4>}
			{commentsList?.length ? (
				<div style={child ? { marginLeft: '40px' } : {}}>
					{commentsList?.map((item, index) => {
						return <Comment key={index} comment={item} />;
					})}
				</div>
			) : (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			)}
		</div>
	);
};

export default CommentsList;
