import { Flex, Container, Box, Center, Divider, Text } from '@chakra-ui/layout';
import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import DataTable from 'react-data-table-component';
import api from '../../api';

const Transactions = () => {
	const auth = useContext(AuthContext);
	const history = useHistory();

	const [data, setData] = useState([]);

	useEffect(async () => {
		if (!auth.isLoggedIn) {
			history.push('/');
			return;
		} else
			await api
				.post('/getTransactionsById', { id: auth.userDetails.id })
				.then(res => {
					setData(res.data.sortedArray.reverse());
				})
				.catch(err => toast.error(err.response.data.message));
	}, []);

	const columns = [
		{
			name: 'Transaction ID',
			selector: '_id',
		},
		{
			name: 'Receiver ID',
			selector: 'receiver_id',
		},
		{
			name: 'Amount',
			selector: 'amt',
			sortable: true,
		},
		{
			name: 'Date and Time',
			selector: 'timestamp',
			sortable: true,
		},
	];

	const conditionalRowStyles = [
		{
			when: row => row.receiver_id === auth.userDetails.id,
			style: {
				color: 'green',
			},
		},
		{
			when: row => row.receiver_id !== auth.userDetails.id,
			style: {
				color: 'red',
			},
		},
	];

	return (
		<Flex justify="center" align="center" wrap="no-wrap">
			<Container maxW="xl" mt="5vh" centerContent>
				<Box padding="10" minWidth="50vw" borderWidth="5" bg="#ffffff" borderRadius={10}>
					<Center>
						<Text fontSize="3xl">Transactions</Text>
					</Center>
					<Divider paddingTop="10" />

					<DataTable
						conditionalRowStyles={conditionalRowStyles}
						columns={columns}
						data={data}
						responsive
						pagination
						paginationPerPage="5"
					/>
				</Box>
			</Container>
		</Flex>
	);
};

export default Transactions;
