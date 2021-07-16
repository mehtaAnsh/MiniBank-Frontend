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
					if (res.status === 201) {
						var arr = res.data.sortedArray.reverse();
						arr.forEach(obj => {
							if (obj.sender_id === 100) obj.sender_id = <b>Transferred from bank</b>;
							if (obj.receiver_id === 100) obj.receiver_id = <b>Transferred to bank</b>;
						});
						setData(arr);
					} else {
						toast.error('An error occured.');
					}
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
