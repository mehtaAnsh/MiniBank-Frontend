import { Flex, Container, Box, Center, Divider, Text } from '@chakra-ui/layout';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

import { AuthContext } from '../../../context/AuthContext';
import api from '../../../api';

const AdminHome = () => {
	const history = useHistory();
	const auth = useContext(AuthContext);

	const [users, setUsers] = useState('');
	const [balance, setBalance] = useState('');

	useEffect(async () => {
		if (!auth.isAdmin && localStorage.getItem('admin') === null) {
			history.push('/');
			return;
		}
		await api
			.get('/getUsers', {})
			.then(res => {
				auth.usersObj = res.data.users;
				setUsers(auth.usersObj.length);
				var total_bal = 0;
				auth.usersObj.forEach(user => (total_bal += user.balance));
				setBalance(total_bal);
			})
			.catch(err => toast.error('An error occured.'));
	}, []);

	return (
		<Flex justify="center" align="center" wrap="no-wrap">
			<Container maxW="xl" mt="15vh" centerContent>
				<Box padding="10" minWidth="20vh" borderWidth="5" bg="#ffffff" borderRadius={10}>
					<Center>
						<Text fontSize="3xl">Welcome to Mini Bank!</Text>
					</Center>
					<Divider paddingTop="10" />
					<Center>
						<Text fontSize="3xl" paddingTop="10">
							Total users: <b>{users}</b>
						</Text>
					</Center>
					<Center>
						<Text fontSize="3xl">
							Total balance in bank: <b>{balance}</b>
						</Text>
					</Center>
				</Box>
			</Container>
		</Flex>
	);
};

export default AdminHome;
