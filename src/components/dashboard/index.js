import { Flex, Container, Box, Center, Divider, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

const Dashboard = props => {
	const history = useHistory();
	const [id, setId] = useState('');
	const [balance, setBal] = useState(0);

	useEffect(() => {
		if (props.location.state === undefined) {
			history.push('/');
			return;
		}
		setId(props.location.state.id);
		setBal(props.location.state.balance);
		setTimeout(() => toast.success('Check the sidebar for all features.'), 1000);
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
							ID: <b>{id}</b>
						</Text>
					</Center>
					<Center>
						<Text fontSize="3xl">
							Account Balance: <b>{balance}</b>
						</Text>
					</Center>
				</Box>
			</Container>
		</Flex>
	);
};

export default Dashboard;
