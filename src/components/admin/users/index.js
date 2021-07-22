import { Flex, Container, Box, Center, Divider, Text } from '@chakra-ui/layout';
import {
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Stack,
	FormLabel,
	Input,
	DrawerFooter,
	Button,
	FormControl,
	FormHelperText,
} from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';
import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Amplify, { Auth } from 'aws-amplify';

import { AuthContext } from '../../../context/AuthContext';
import api from '../../../api';
import awsconfig from '../../../aws-exports';

const AdminUsers = () => {
	Amplify.configure(awsconfig);

	const auth = useContext(AuthContext);
	const history = useHistory();

	const [users, setUsers] = useState([]);
	const [email, setEmail] = useState();
	const [bal, setBal] = useState();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const firstField = React.useRef();

	useEffect(async () => {
		if (!auth.isAdmin && localStorage.getItem('admin') === null) {
			history.push('/');
			return;
		}
		if (auth.usersObj === undefined || auth.usersObj.length === 0) {
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

	const onFormSubmit = async () => {
		if (!email || !bal) {
			toast.error('Fill required parameters');
			return;
		}

		try {
			await Auth.signUp({
				username: email,
				password: 'abc@1234',
			}).then(async () => {
				await api
					.post('/create_user', { email, balance: bal })
					.then(async res => {
						if (res.status === 201) {
							toast.success('User added successfully! An e-mail has been sent with login credentials.');
							await api
								.get('/getUsers', {})
								.then(res => {
									auth.usersObj = res.data.users;
									setUsers(auth.usersObj);
								})
								.catch(err => toast.error('AN error occured.'));
						} else {
							toast.error('An error occured.');
						}
					})
					.catch(err => toast.error(err.response.data.message));
			});
		} catch (error) {
			console.error(error);
			toast.error(`Failed: ${error.message}`);
		}
	};

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
				<Drawer isOpen={isOpen} placement="right" initialFocusRef={firstField} onClose={onClose}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader borderBottomWidth="1px">Add New User</DrawerHeader>

						<DrawerBody>
							<Stack spacing="24px">
								<FormControl isRequired>
									<FormLabel htmlFor="username">Email address</FormLabel>
									<Input
										ref={firstField}
										value={email}
										onChange={e => setEmail(e.target.value)}
										id="email"
										type="email"
										placeholder="temp@gmail.com"
									/>
									<FormHelperText>We will not share the email.</FormHelperText>
								</FormControl>
								<FormControl isRequired>
									<FormLabel htmlFor="bal">Balance</FormLabel>
									<Input
										value={bal}
										onChange={e => setBal(e.target.value)}
										type="number"
										id="bal"
										placeholder="Enter initial balance"
									/>
								</FormControl>
							</Stack>
						</DrawerBody>

						<DrawerFooter borderTopWidth="1px">
							<Button variant="outline" mr={3} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme="blue" onClick={onFormSubmit}>
								Submit
							</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
				<Box padding="10" minWidth="50vw" borderWidth="5" bg="#ffffff" borderRadius={10}>
					<Center>
						<Text fontSize="3xl">List of all Users</Text>
					</Center>
					<Center>
						<Button marginTop={5} leftIcon={<GrAdd />} colorScheme="blue" onClick={onOpen}>
							Create user
						</Button>
					</Center>
					<Divider paddingTop="10" />

					<DataTable columns={columns} data={users} responsive pagination paginationPerPage="5" />
				</Box>
			</Container>
		</Flex>
	);
};

export default AdminUsers;
