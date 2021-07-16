import React, { useContext } from 'react';
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
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Header = props => {
	const history = useHistory();
	const auth = useContext(AuthContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

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
				{auth.isLoggedIn && (
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
										<NavLink to="/dashboard">Home</NavLink>
									</Text>
									<Text fontSize="2xl" paddingBottom="3">
										<NavLink to="/transfer">Transfer</NavLink>
									</Text>
									<Text fontSize="2xl" paddingBottom="3">
										<NavLink to="/userTransactions">Transactions</NavLink>
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
				)}

				<Flex flex={{ base: 1 }} justify={{ base: 'center' }}>
					<Text fontSize="2xl" fontFamily={'heading'} color={useColorModeValue('gray.800', 'white')}>
						<NavLink to="/">MiniBank</NavLink>
					</Text>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
