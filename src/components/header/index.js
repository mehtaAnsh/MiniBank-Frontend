import React from 'react';
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
	IconButton,
	Button,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';

import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
	const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
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
				<>
					<Button ref={btnRef} colorScheme="blue" onClick={onOpen}>
						<GiHamburgerMenu />
					</Button>
					<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader>Hello person!</DrawerHeader>
						</DrawerContent>
					</Drawer>
				</>

				<Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
					<IconButton onClick={onToggle} variant={'ghost'} aria-label={'Toggle Navigation'} />
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: 'center' }}>
					<Text fontSize="2xl" fontFamily={'heading'} color={useColorModeValue('gray.800', 'white')}>
						MiniBank
					</Text>
				</Flex>

				<Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
					<Button
						display={{ md: 'inline-flex' }}
						fontSize={'sm'}
						fontWeight={600}
						color={'white'}
						bg={'pink.400'}
						href={'#'}
						_hover={{
							bg: 'pink.300',
						}}
					>
						Sign In
					</Button>
				</Stack>
			</Flex>
		</Box>
	);
};

export default Header;
