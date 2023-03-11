import React, { FC, useEffect, useState } from 'react';
import Person2Icon from '@mui/icons-material/Person2';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from '../Comments/Comments.module.css';
import { DataType } from '../../types/types';
import SubCommentsList from './SubCommentsList';

type PropsType = {
	comment?: DataType;
};

const SubComment: FC<PropsType> = ({ comment }) => {
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
		<div className={styles.subComment}>
			<div onClick={handleClick}>
				{hasChild && <ArrowDropDownIcon className={styles.arrow} />}
				<p className={styles.text}>{comment?.text}</p>
				<span className={styles.author}>
					<div className={styles.alignBottom}>
						<Person2Icon />
						<span>{comment?.by}</span>
					</div>
				</span>
			</div>

			{isClicked && <SubCommentsList comments={comment?.kids} />}
		</div>
	);
};

export default SubComment;
