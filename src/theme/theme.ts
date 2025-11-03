import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#06cdaf',
            light: '#5fffd2',
            dark: '#13b89f',
        },
        secondary: {
            main: '#1976d2',
        },
        error: {
            main: '#f44336',
        },
        success: {
            main: '#4caf50',
        },
        background: {
            default: '#dcf4f3',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#555555',
        },
    },
    typography: {
        fontFamily: 'Montserrat, Arial, sans-serif',
        h1: { fontSize: '2rem', fontWeight: 700 },
        h2: { fontSize: '1.75rem', fontWeight: 600 },
        body1: { fontSize: '1rem', color: '#000000' },
        body2: { fontSize: '0.875rem', color: '#555555' },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
        borderRadius: 8,
    },
});

export default theme;
