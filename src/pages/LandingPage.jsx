import Sidebar from "../components/Sidebar";
import PublicationsList from "../components/PublicationList";
import { Grid, GridItem, Box, Heading, Text, Divider  } from '@chakra-ui/react';

const LandingPage = () => {

    return (
        <>
            <Sidebar />

            <Box textAlign="center" my={10} px={4}>
                <Heading
                    as="h1"
                    size="2xl"
                    fontWeight="extrabold"
                    bgGradient="linear(to-r, teal.500, blue.500)"
                    bgClip="text"
                    mb={2}
                >
                    Cronicas de desarrollador
                </Heading>
                <Text fontSize="lg" color="gray.600" mb={4}>
                    "El poder del mañana se construye hoy, con disciplina, innovación y visión clara."
                </Text>
                <Divider borderColor="teal.300" width="30%" mx="auto" borderWidth="2px" borderRadius="md" />
            </Box>

            <Grid templateColumns="2fr 1fr" gap={6} p={6}>
                {/* Columna izquierda (2/3) */}
                <GridItem>
                    <Box>
                        <PublicationsList />
                    </Box>
                </GridItem>

                {/* Columna derecha (1/3) */}
                <GridItem>
                    <Box bg="green.100" p={4} borderRadius="md">
                    <strong>Columna secundaria (1/3)</strong><br />
                    Ideal para un sidebar, widgets, enlaces o anuncios.
                    </Box>
                </GridItem>
            </Grid>
        </>
    )
}

export default LandingPage;