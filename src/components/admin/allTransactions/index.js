import { Flex, Container, Box, Center, Divider, Text } from '@chakra-ui/layout';
import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import DataTable from 'react-data-table-component';
import api from '../../../api';

const AdminAllTransactions = () => {
	const auth = useContext(AuthContext);
	const history = useHistory();

	const [users, setUsers] = useState([]);

	useEffect(async () => {
		if (!auth.isAdmin) {
			history.push('/');
			return;
		}

		await api
			.get('/getAllTransactions', {})
			.then(res => {
				if (res.status === 201) {
					var arr = res.data.transactions.reverse();
					arr.forEach(obj => {
						if (obj.sender_id === 100) obj.sender_id = <b>Transferred from bank</b>;
						if (obj.receiver_id === 100) obj.receiver_id = <b>Transferred from bank</b>;
					});
					setUsers(arr);
				}
			})
			.catch(err => toast.error('AN error occured.'));
		return;
	}, []);

	const columns = [
		{
			name: 'Transaction ID',
			selector: '_id',
		},
		{
			name: 'Sender ID',
			selector: 'sender_id',
		},
		{
			name: 'Receiver ID',
			selector: 'receiver_id',
		},
		{
			name: 'Balance',
			selector: 'amt',
			sortable: true,
		},
		{
			name: 'Date and Time',
			selector: 'timestamp',
			sortable: true,
		},
	];

	return (
		<Flex justify="center" align="center" wrap="no-wrap">
			<Container maxW="xl" mt="5vh" centerContent>
				<Box padding="10" minWidth="80vw" borderWidth="5" bg="#ffffff" borderRadius={10}>
					<Center>
						<Text fontSize="3xl">List of all Transactions</Text>
					</Center>
					<Divider paddingTop="10" />

					<DataTable columns={columns} data={users} responsive pagination paginationPerPage="5" />
				</Box>
			</Container>
		</Flex>
	);
};

export default AdminAllTransactions;
