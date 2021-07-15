import React from 'react';
import { Box, Center, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
	return (
		<Box borderTop={1} borderStyle={'solid'} borderColor={useColorModeValue('gray.200', 'gray.900')}>
			<Center mt={3}>Made with {`<3`} by Ansh Mehta</Center>
		</Box>
	);
};

export default Footer;
