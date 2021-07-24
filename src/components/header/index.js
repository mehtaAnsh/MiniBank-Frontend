import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
	Drawer,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerBody,
	useDisclosure,
	Box,
	Flex,
	Text,
	Button,
	useColorModeValue,
	DrawerFooter,
} from '@chakra-ui/react';

import { GiHamburgerMenu } from 'react-icons/gi';
import toast from 'react-hot-toast';

const Header = props => {
	const history = useHistory();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

	const adminDrawer = () => {
		return (
			<>
				<Button ref={btnRef} colorScheme="blue" onClick={onOpen}>
					<GiHamburgerMenu />
				</Button>
				<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader borderBottomWidth="1px">Hello admin!</DrawerHeader>
						<DrawerBody>
							<Text fontSize="2xl" paddingBottom="3">
								<NavLink to={`${process.env.PUBLIC_URL}/admin/home`}>Home</NavLink>
							</Text>
							<Text fontSize="2xl" paddingBottom="3">
								<NavLink to={`${process.env.PUBLIC_URL}/admin/users`}>All Users</NavLink>
							</Text>
							<Text fontSize="2xl" paddingBottom="3">
								<NavLink to={`${process.env.PUBLIC_URL}/admin/transfer`}>Transfer Money</NavLink>
							</Text>
							<Text fontSize="2xl" paddingBottom="3">
								<NavLink to={`${process.env.PUBLIC_URL}/admin/allTransactions`}>
									All Transactions
								</NavLink>
							</Text>
						</DrawerBody>
						<DrawerFooter borderTopWidth="1px" justifyContent="flex-start">
							<Button
								variant="outline"
								bg="red.500"
								onClick={() => {
									localStorage.clear();
									props.setIsAdmin(false);
									props.setUserDetails({});
									toast.success('Logging out..');
									setTimeout(() => history.push('/'), 3000);
								}}
							>
								Log out
							</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	const userDrawer = () => {
		return (
			<>
				<Button ref={btnRef} colorScheme="blue" onClick={onOpen}>
					<GiHamburgerMenu />
				</Button>
				<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader borderBottomWidth="1px">Hello user!</DrawerHeader>
						<DrawerBody>
							<Text fontSize="2xl" paddingBottom="3">
								<NavLink to={`${process.env.PUBLIC_URL}/dashboard`}>Home</NavLink>
							</Text>
							<Text fontSize="2xl" paddingBottom="3">
								<NavLink to={`${process.env.PUBLIC_URL}/transfer`}>Transfer</NavLink>
							</Text>
							<Text fontSize="2xl" paddingBottom="3">
								<NavLink to={`${process.env.PUBLIC_URL}/userTransactions`}>Transactions</NavLink>
							</Text>
						</DrawerBody>
						<DrawerFooter borderTopWidth="1px" justifyContent="flex-start">
							<Button
								variant="outline"
								bg="red.500"
								onClick={() => {
									localStorage.clear();
									props.setIsLoggedIn(false);
									props.setUserDetails({});
									toast.success('Logging out..');
									setTimeout(() => history.push('/'), 3000);
								}}
							>
								Log out
							</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}
			>
				{localStorage.getItem('id') !== null && userDrawer()}

				{localStorage.getItem('admin') !== null && adminDrawer()}

				<Flex flex={{ base: 1 }} justify={{ base: 'center' }}>
					<Text fontSize="2xl" fontFamily={'heading'} color={useColorModeValue('gray.800', 'white')}>
						<NavLink to={`${process.env.PUBLIC_URL}/`}>MiniBank</NavLink>
					</Text>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
