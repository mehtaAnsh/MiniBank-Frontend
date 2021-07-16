import { createContext } from 'react';

export const AuthContext = createContext({
	isLoggedIn: false,
	userDetails: {},
	isAdmin: false,
	usersObj: [],
});
