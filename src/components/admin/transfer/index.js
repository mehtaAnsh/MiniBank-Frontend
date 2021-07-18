import {
	Flex,
	Container,
	Box,
	Center,
	Divider,
	Text,
	FormLabel,
	Menu,
	MenuButton,
	Button,
	MenuList,
	Input,
	RadioGroup,
	Stack,
	Radio,
	FormControl,
	MenuItem,
} from '@chakra-ui/react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../../context/AuthContext';
import api from '../../../api';

const AdminTransfer = () => {
	const auth = useContext(AuthContext);
	const history = useHistory();

	const [dropdownArr, setDropDownArr] = useState([]);
	const [id, setId] = useState('');
	const [type, setType] = useState();
	const [amt, setAmt] = useState();

	useEffect(async () => {
		if (!auth.isAdmin && localStorage.getItem('admin') === null) {
			history.push('/');
			return;
		}
		var dropdownArr = [];
		function mapAndFilter(arr) {
			arr.forEach(obj => {
				dropdownArr.push({ id: obj.id });
			});
			setDropDownArr(dropdownArr);
		}
		if (auth.usersObj === undefined || auth.usersObj.length === 0) {
			await api
				.get('/getUsers', {})
				.then(res => {
					auth.usersObj = res.data.users;
					mapAndFilter(auth.usersObj);
				})
				.catch(err => toast.error('An error occured.'));
			return;
		}

		mapAndFilter(auth.usersObj);
	}, []);

	const onFormSubmit = async () => {
		if (!id || !type || !amt) {
			toast.error('Fill all parameters');
			return;
		}
		const toastID = toast.loading('Processing...');
		await api
			.post('/transact', { id, type, amt })
			.then(res => {
				if (res.status === 201) {
					toast.success('Money transferred sucessfully!', { id: toastID });
				} else {
					toast.error('An unknown error occured. Please try again.', { id: toastID });
				}
			})
			.catch(err => toast.error(err.response.data.message, { id: toastID }));
	};

	return (
		<Flex justify="center" align="center" wrap="no-wrap">
			<Container maxW="xl" mt="10vh" centerContent>
				<motion.div animate={{ scale: 1.04 }} transition={{ duration: 0.5 }}>
					<Box padding="10" minWidth="30vw" bg="gray.50" borderRadius={10}>
						<Center>
							<Text fontSize="3xl">Credit/Debit Money</Text>
						</Center>
						<Divider paddingTop="5" />
						<Center>
							<FormControl id="email" paddingY="5" isRequired>
								<FormLabel>Select user ID</FormLabel>
								<Menu>
									<MenuButton as={Button} rightIcon={<AiOutlineCaretDown />}>
										{id || 'Select one'}
									</MenuButton>
									<MenuList>
										{dropdownArr.map(({ id }) => {
											return (
												<MenuItem
													value={id}
													onClick={e => {
														setId(e.target.value);
														console.log(e.target.value);
													}}
												>
													{id}
												</MenuItem>
											);
										})}
									</MenuList>
								</Menu>
							</FormControl>
						</Center>
						<Center>
							<FormControl isRequired paddingY="5">
								<FormLabel>Type of transaction</FormLabel>
								<RadioGroup onChange={setType} value={type}>
									<Stack direction="row">
										<Radio value="0">Debit</Radio>
										<Radio value="1">Credit</Radio>
									</Stack>
								</RadioGroup>
							</FormControl>
						</Center>
						<Center>
							<FormControl id="password" paddingBottom="5" isRequired>
								<FormLabel>Amount</FormLabel>
								<Input
									value={amt}
									onChange={e => setAmt(e.target.value)}
									placeholder="Enter amount to transfer"
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

export default AdminTransfer;
