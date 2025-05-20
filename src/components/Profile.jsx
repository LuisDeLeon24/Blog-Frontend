import React from 'react';
import {
    Box,
    Avatar,
    Heading,
    Text,
    Stack,
    Button,
    Link,
    useColorModeValue,
    IconButton,
    VStack
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const BlogProfileCard = ({
    name = "Luis De León",
    title = "Desarrollador | Blogger",
    bio = "Apasionado por la tecnología, la escritura y el aprendizaje continuo.",
    imageUrl = "https://via.placeholder.com/150",
    githubUrl="https://github.com/LuisDeLeon24",
    linkedinUrl,
    twitterUrl,
    aboutMeUrl
}) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.700', 'gray.300');
    const headingColor = useColorModeValue('gray.800', 'white');

    return (
        <Box
            maxW="md"
            mx="auto"
            mt={10}
            p={6}
            bg={bgColor}
            borderRadius="xl"
            boxShadow="lg"
            textAlign="center"
        >
            <Avatar
                size="2xl"
                name={name}
                src={imageUrl}
                mb={4}
            />
            <Heading fontSize="2xl" color={headingColor}>
                {name}
            </Heading>
            <Text fontSize="md" color="gray.500" mb={2}>
                {title}
            </Text>
            <Text fontSize="sm" color={textColor} mb={4}>
                {bio}
            </Text>

            <Stack direction="row" spacing={4} justify="center" mb={4}>
                {githubUrl && (
                    <Link href={githubUrl} isExternal>
                        <IconButton
                            icon={<FaGithub />}
                            isRound
                            variant="ghost"
                            colorScheme="blue"
                            aria-label="GitHub"
                        />
                    </Link>
                )}
                {linkedinUrl && (
                    <Link href={linkedinUrl} isExternal>
                        <IconButton
                            icon={<FaLinkedin />}
                            isRound
                            variant="ghost"
                            colorScheme="blue"
                            aria-label="LinkedIn"
                        />
                    </Link>
                )}
                {twitterUrl && (
                    <Link href={twitterUrl} isExternal>
                        <IconButton
                            icon={<FaTwitter />}
                            isRound
                            variant="ghost"
                            colorScheme="blue"
                            aria-label="Twitter"
                        />
                    </Link>
                )}
            </Stack>

            {aboutMeUrl && (
                <Link href={aboutMeUrl} isExternal _hover={{ textDecoration: 'none' }}>
                    <Button colorScheme="blue" size="md">
                        Leer más sobre mí
                    </Button>
                </Link>
            )}
        </Box>
    );
};

export default BlogProfileCard;
