import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Container,
	Box,
	Flex,
	Text,
	Center,
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	Divider,
	Button,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const Transfer = () => {
	const auth = useContext(AuthContext);
	const history = useHistory();
	const [id, setId] = useState('');
	const [amt, setAmt] = useState();

	useEffect(() => {
		if (!auth.isLoggedIn && localStorage.getItem('id') === null) {
			history.push('/');
			return;
		}
	}, []);

	const onFormSubmit = async () => {
		const toastID = toast.loading('Processing...');
		if (amt > auth.userDetails.balance) {
			toast.error('Amount exceeds balance in bank!', { id: toastID });
			return;
		}
		await api
			.post('/transfer', { sender_email: localStorage.getItem('email'), receiver: id, amt })
			.then(res => {
				if (res.status === 201) {
					toast.success('Money transferred successfully!', { id: toastID });
				} else {
					toast.error('An error occured. Please refresh the page and try again.', { id: toastID });
				}
			})
			.catch(err => toast.error(err.response.data.message, { id: toastID }));
	};

	return (
		<Flex justify="center" align="center" wrap="no-wrap">
			<Container maxW="xl" mt="15vh" centerContent>
				<motion.div animate={{ scale: 1.04 }} transition={{ duration: 0.5 }}>
					<Box padding="10" minWidth="30vw" bg="gray.50" borderRadius={10}>
						<Center>
							<Text fontSize="3xl">Transfer Money</Text>
						</Center>
						<Divider paddingTop="5" />
						<Center>
							<FormControl id="" paddingY="5" isRequired>
								<FormLabel>ID of the user to transfer</FormLabel>
								<Input
									value={id}
									onChange={e => setId(e.target.value)}
									placeholder="Type recepient's ID"
									type="text"
								/>
								<FormHelperText>Make sure to enter correct ID of 16 length.</FormHelperText>
								<FormHelperText>Add this to transfer: 1903083123925218 (for testing)</FormHelperText>
							</FormControl>
						</Center>
						<Center>
							<FormControl id="password" paddingBottom="5" isRequired>
								<FormLabel>Amount to transfer</FormLabel>
								<Input
									value={amt}
									onChange={e => setAmt(e.target.value)}
									type="number"
									placeholder="Enter amount to transfer"
								/>
							</FormControl>
						</Center>
						<Button onClick={onFormSubmit} colorScheme="blue">
							Submit
						</Button>
					</Box>
				</motion.div>
			</Container>
		</Flex>
	);
};

export default Transfer;
