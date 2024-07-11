'use client';
import { Inter } from "next/font/google";
import { createTheme } from '@mui/material';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
	weight: ['300', '400', '500', '700'],
});

const theme = createTheme({
	//Creating the root
	palette: {
		primary: {
			main: '#13DA87',
			light: '#E7FBF3'
		},
		secondary: {
			main: '#121212',
		},
		mode: 'dark'
	},

	typography: {
		fontFamily: inter.style.fontFamily,
	},

	//Defining the global application styling
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					margin: '0',
					padding: '0',
					boxSizing: 'border-box',
					background: '#121212',
					backgroundImage: 'linear-gradient(45deg, rgba(18,28,24,1) 0%, rgba(18,18,18,1) 40%)',
					color: '#F0F0F0',
					fontWeight: '400'
				},
				button: {
					cursor: 'pointer'
				},
				a: {
					textDecoration: 'none'
				}
			}
		},

		MuiContainer: {
			styleOverrides: {
				root: {
					margin: '0',
					padding: '0'
				}
			}
		},

		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 0,
					boxShadow: 'unset',

					':hover': {
						boxShadow: 'unset'
					}
				}
			}
		}
	}
});

export default theme;