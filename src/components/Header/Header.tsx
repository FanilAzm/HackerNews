import React, { FC } from 'react';
import { Box, Button, Container } from '@mui/material';
import styles from './Header.module.css';

type PropsType = {
	updateData: () => void;
	fetching: boolean;
};

const Header: FC<PropsType> = ({ updateData, fetching }) => {
	return (
		<div className={styles.root}>
			<Container maxWidth='lg'>
				<div className={styles.inner}>
					<h2 className={styles.logo}>Hacker News</h2>
					<Button
						disabled={fetching}
						onClick={() => updateData()}
						variant='outlined'
						color='success'
					>
						Refresh
					</Button>
				</div>
			</Container>
		</div>
	);
};

export default Header;
