import React, { useState } from 'react';
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

const Home = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const history = useHistory();

	const onFormSubmit = async () => {
		if (!email || !password) {
			toast.error('Fill all values');
			return;
		}

		if (email === 'admin' && password === 'admin') {
			toast.success('Welcome admin!');
			props.setIsAdmin(true);
			setTimeout(() => history.push('/admin/home', { status: true }), 3000);
			return;
		}

		await api
			.post(`/verify`, { email, password })
			.then(res => {
				localStorage.setItem('id', res.data.id);
				props.setUserDetails(res.data);
				props.setIsLoggedIn(true);
				toast.success('Success! You are logged in.');
				setTimeout(() => history.push('/dashboard', { status: true }), 3000);
			})
			.catch(err => {
				toast.error(err.response.data.message);
			});
	};

	return (
		<Flex justify="center" align="center" wrap="no-wrap">
			<Container maxW="xl" mt="15vh" centerContent>
				<motion.div animate={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
					<Box padding="10" minWidth="30vw" bg="gray.50" borderRadius={10}>
						<Center>
							<Text fontSize="3xl">Login</Text>
						</Center>
						<Divider paddingTop="5" />
						<Center>
							<FormControl id="email" paddingY="5" isRequired>
								<FormLabel>Email address</FormLabel>
								<Input
									value={email}
									onChange={e => setEmail(e.target.value)}
									placeholder="Type your e-mail address"
									type="email"
								/>
								<FormHelperText>We'll never share your email.</FormHelperText>
							</FormControl>
						</Center>
						<Center>
							<FormControl id="password" paddingBottom="5" isRequired>
								<FormLabel>Password</FormLabel>
								<Input
									value={password}
									onChange={e => setPassword(e.target.value)}
									placeholder="*********"
									type="password"
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

export default Home;
