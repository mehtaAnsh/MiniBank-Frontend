import { Flex, Container, Box, Center, Divider, Text } from '@chakra-ui/layout';
import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import DataTable from 'react-data-table-component';
import api from '../../../api';

const AdminUsers = () => {
	const auth = useContext(AuthContext);
	const history = useHistory();

	const [users, setUsers] = useState([]);

	useEffect(async () => {
		if (!auth.isAdmin) {
			history.push('/');
			return;
		}
		if (auth.usersObj.length === 0) {
			await api
				.get('/getUsers', {})
				.then(res => {
					auth.usersObj = res.data.users;
					setUsers(auth.usersObj);
				})
				.catch(err => toast.error('AN error occured.'));
			return;
		}
		setUsers(auth.usersObj);
	}, []);

	const columns = [
		{
			name: 'User ID',
			selector: 'id',
		},
		{
			name: 'Email',
			selector: 'email',
		},
		{
			name: 'Balance',
			selector: 'balance',
			sortable: true,
		},
	];

	return (
		<Flex justify="center" align="center" wrap="no-wrap">
			<Container maxW="xl" mt="5vh" centerContent>
				<Box padding="10" minWidth="50vw" borderWidth="5" bg="#ffffff" borderRadius={10}>
					<Center>
						<Text fontSize="3xl">List of all Users</Text>
					</Center>
					<Divider paddingTop="10" />

					<DataTable columns={columns} data={users} responsive pagination paginationPerPage="5" />
				</Box>
			</Container>
		</Flex>
	);
};

export default AdminUsers;
