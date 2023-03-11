import React, { FC, useState } from 'react';
import Person2Icon from '@mui/icons-material/Person2';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DataType } from '../../types/types';
import styles from './Comments.module.css';
import { useEffect } from 'react';
import CommentsList from './CommentsList';

type PropsType = {
	comment?: DataType;
};

const Comment: FC<PropsType> = ({ comment }) => {
	const [hasChild, setHasChild] = useState(false);
	const [isClicked, setIsClicked] = useState(false);

	useEffect(() => {
		checkedChild();
	}, [comment?.kids]);

	const checkedChild = () => {
		comment?.kids === undefined ? setHasChild(false) : setHasChild(true);
	};

	const handleClick = () => {
		hasChild && setIsClicked(true);
	};

	return (
		<div className={styles.comment}>
			<div onClick={handleClick}>
				{hasChild && <ArrowDropDownIcon className={styles.arrow} />}
				{comment?.deleted ? (
					<p className={styles.text}>Sorry, this comment has been deleted</p>
				) : (
					<p className={styles.text}>{comment?.text}</p>
				)}
				<span className={styles.author}>
					<div className={styles.alignBottom}>
						<Person2Icon />
						<span>{comment?.by}</span>
					</div>
				</span>
			</div>
			{isClicked && <CommentsList comments={comment?.kids} child={hasChild} />}
		</div>
	);
};

export default Comment;
