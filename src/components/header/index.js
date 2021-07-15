import React from 'react';
import { Link } from 'react-router-dom';
import {
	Drawer,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Box,
	Flex,
	Text,
	Button,
	useColorModeValue,
} from '@chakra-ui/react';

import { GiHamburgerMenu } from 'react-icons/gi';

const Header = props => {
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
				{props.isLoggedIn && (
					<>
						<Button ref={btnRef} colorScheme="blue" onClick={onOpen}>
							<GiHamburgerMenu />
						</Button>
						<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
							<DrawerOverlay />
							<DrawerContent>
								<DrawerCloseButton />
								<DrawerHeader>Hello!</DrawerHeader>
							</DrawerContent>
						</Drawer>
					</>
				)}

				<Flex flex={{ base: 1 }} justify={{ base: 'center' }}>
					<Text fontSize="2xl" fontFamily={'heading'} color={useColorModeValue('gray.800', 'white')}>
						<Link to="/">MiniBank</Link>
					</Text>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
