import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Box, Flex, Text, Center, FormControl, FormLabel, Input, Divider, Button } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import Amplify, { Auth } from 'aws-amplify';
import { motion } from 'framer-motion';
import awsconfig from '../../aws-exports';

const Verify = props => {
	Amplify.configure(awsconfig);

	const [email, setEmail] = useState('');
	const [code, setCode] = useState('');

	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		if (location.state === undefined) {
			history.push('/');
			return;
		}
		setEmail(location.state.email);
	}, []);

	const onFormSubmit = async () => {
		if (!email || !code) {
			toast.error('Fill all values');
			return;
		}

		const toastID = toast.loading('Verifying...');

		try {
			await Auth.confirmSignUp(email, code).then(() => {
				localStorage.setItem('id', location.state.id);
				props.setIsLoggedIn(false);
				props.setIsLoggedIn(true);
				toast.success('Success! You are logged in.', { id: toastID });
				setTimeout(() => history.push('/dashboard', { status: true }), 3000);
			});
		} catch (error) {
			toast.error(`Failed: ${error.message}`, { id: toastID });
		}
	};

	return (
		<Flex justify="center" align="center" wrap="no-wrap">
			<Container maxW="xl" mt="15vh" centerContent>
				<motion.div animate={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
					<Box padding="10" minWidth="30vw" bg="gray.50" borderRadius={10}>
						<Center>
							<Text fontSize="3xl">Verify</Text>
						</Center>
						<Divider paddingTop="5" />
						<Center>
							<FormControl id="email" paddingY="5" isRequired>
								<FormLabel>Email address</FormLabel>
								<Input
									value={email}
									onChange={e => setEmail(e.target.value)}
									placeholder="Type your e-mail address"
									disabled
									type="email"
								/>
							</FormControl>
						</Center>
						<Center>
							<FormControl id="password" paddingBottom="5" isRequired>
								<FormLabel>Verification Code</FormLabel>
								<Input
									value={code}
									onChange={e => setCode(e.target.value)}
									placeholder="123456"
									type="number"
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

export default Verify;
