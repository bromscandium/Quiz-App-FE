import { Helmet } from 'react-helmet-async';
import { Container, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Home() {
    const theme = useTheme();

    return (
        <Container>
            <Helmet>
                <title>Home Page | Quiz App</title>
            </Helmet>
            <Typography variant="h1">Quiz App Page</Typography>
            <Box m={4} border={1} borderColor={theme.palette.primary.dark} margin={4} padding={4}>
                <Typography variant="body1">Hello! Let's get started.</Typography>
            </Box>
        </Container>
    );
}
