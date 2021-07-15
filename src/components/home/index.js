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

import api from '../../api';

const Home = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const history = useHistory();

	const onFormSubmit = () => {
		if (!email || !password) {
			toast.error('Fill all values');
			return;
		}
		props.setIsLoggedIn(true);
		toast.success('Logged in!');
		setTimeout(() => history.push('/dashboard'), 3000);
		/*
		await api
			.post(`/verify`, { email, password })
			.then(res => {
				if (res.status === 200) {
					localStorage.setItem('email', email);
					props.setIsLoggedIn(true);
					toast.success('Submitted! An email has been sent.');
					setTimeout(() => history.push('/dashboard', { status: true }), 3000);
				}
			})
			.catch(err => {
				console.log(err);
				toast.error('An error occured.');
			});
			*/
	};

	return (
		<Flex justify="center" align="center" wrap="no-wrap">
			<Container maxW="xl" mt="15vh" centerContent>
				<Box padding="10" minWidth="20vh" bg="gray.100" borderRadius={10}>
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
			</Container>
		</Flex>
	);
};

export default Home;
