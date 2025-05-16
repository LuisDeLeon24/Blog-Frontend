import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

const PublicationCard = ({ publication }) => {
  if (!publication) return null;

  const { title, description, photos = [], comments = [] } = publication;

  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      maxW="100%"           // Aumenté el ancho máximo
      boxShadow="lg"
      bg="white"
    >
      <Flex gap={6} align="center">
        {/* Carrusel de imágenes */}
        <Box w="50%" position="relative">
          {photos.length > 0 && (
            <>
              <Image
                src={photos[currentImage]}
                alt={`Imagen ${currentImage + 1} de ${title}`}
                borderRadius="md"
                objectFit="cover"
                w="100%"
                h="250px"          // Imagen más alta
              />
              <Button
                size="md"          // Botones más grandes
                position="absolute"
                top="50%"
                left="10px"
                transform="translateY(-50%)"
                onClick={prevImage}
              >
                {"<"}
              </Button>
              <Button
                size="md"
                position="absolute"
                top="50%"
                right="10px"
                transform="translateY(-50%)"
                onClick={nextImage}
              >
                {">"}
              </Button>
            </>
          )}
        </Box>

        {/* Info de la publicación */}
        <VStack align="start" w="50%" spacing={3}>
          <Text fontWeight="bold" fontSize="2xl">
            {title}
          </Text>
          <Text fontSize="md" color="gray.700" noOfLines={4}>
            {description}
          </Text>

          <HStack spacing={6} pt={3}>
            {/* Botón like */}
            <IconButton
              icon={liked ? <FaHeart color="red" /> : <FaRegHeart />}
              aria-label="Like"
              onClick={() => setLiked(!liked)}
              variant="ghost"
              size="md"
            />

            {/* Botón comentarios */}
            <Button
              leftIcon={<FaComment />}
              size="md"
              onClick={() => alert("Mostrar comentarios")}
            >
              Comentarios ({comments.length})
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default PublicationCard;
