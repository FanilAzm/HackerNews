import { Box, CircularProgress } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { baseURL } from '../../api/api';
import { DataType } from '../../types/types';
import SubComment from './SubComment';

type PropsType = {
	comments: number[] | undefined;
};

const SubCommentsList: FC<PropsType> = ({ comments }) => {
	const [subCommentsList, setSubCommentsList] = useState<DataType[]>([]);

	useEffect(() => {
		fetchComments();
	}, [subCommentsList]);

	const fetchComments = async () => {
		const commentsData: DataType[] = await Promise.all(
			// @ts-ignore
			comments.map((id: number) => {
				return fetch(`${baseURL}/item/${id}.json?print=pretty`).then(data =>
					data.json()
				);
			})
		);

		setSubCommentsList(commentsData);
	};

	return (
		<div>
			{subCommentsList?.length ? (
				<>
					{subCommentsList?.map((item, index) => {
						return <SubComment key={index} comment={item} />;
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

export default SubCommentsList;
