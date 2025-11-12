import { createTheme } from '@mui/material/styles';

const palette = {
	primary: {
		main: '#06cdaf',
		light: '#5fffd2',
		dark: '#0d8775',
		contrastText: '#ffffff',
	},
	secondary: {
		main: '#1976d2',
		contrastText: '#ffffff',
	},
	error: {
		main: '#f44336',
	},
	success: {
		main: '#4caf50',
	},
	background: {
		default: '#f1f4f6',
		paper: '#ffffff',
	},
	text: {
		primary: '#000000',
		secondary: '#555555',
	},
	divider: '#e5e7eb',
};

export const theme = createTheme({
	palette,
	typography: {
		fontFamily: "'Montserrat', 'Inter', sans-serif",
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: palette.background.default,
					color: palette.text.primary,
				},
			},
		},
	},
});
