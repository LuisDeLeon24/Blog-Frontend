import React, { useState } from "react";
import {
  Box, Button, Flex, IconButton, Image, Text, VStack, HStack
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

const PublicationCard = ({ publication, onClick }) => {
  if (!publication) return null;

  const { _id, title, description, photos = [], comments = [], category, updatedAt } = publication;

  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);

  const hasPhotos = photos.length > 0;

  const nextImage = (e) => {
    e.stopPropagation();
    if (!hasPhotos) return;
    setCurrentImage((prev) => (prev + 1) % photos.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (!hasPhotos) return;
    setCurrentImage((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      maxW="100%"
      boxShadow="lg"
      bg="white"
      cursor="pointer"
      onClick={onClick}
    >
      <Flex direction="column" gap={6}>
        <Box position="relative" width="100%" height="450px">
          {hasPhotos ? (
            <>
              <Image
                src={photos[currentImage]}
                alt={`Imagen ${currentImage + 1} de ${title}`}
                borderRadius="md"
                objectFit="cover"
                w="100%"
                h="100%"
              />
              <Button
                size="md"
                position="absolute"
                top="50%"
                left="10px"
                transform="translateY(-50%)"
                onClick={prevImage}
                zIndex="1"
                aria-label="Imagen anterior"
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
                zIndex="1"
                aria-label="Siguiente imagen"
              >
                {">"}
              </Button>
            </>
          ) : (
            <Box
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="gray.100"
              borderRadius="md"
              color="gray.500"
            >
              No hay imágenes
            </Box>
          )}
        </Box>

        <VStack align="start" spacing={3} w="100%">
          <Text fontWeight="bold" fontSize="2xl">{title}</Text>
          <Text fontSize="sm" color="gray.600">Materia: {category}</Text>
          <Text fontSize="sm" color="gray.600">Publicado el: {formatDate(updatedAt)}</Text>
          <Text fontSize="md" color="gray.700" noOfLines={4}>{description}</Text>

          <HStack spacing={6} pt={3}>
            <IconButton
              icon={liked ? <FaHeart /> : <FaRegHeart />}
              aria-label="Like"
              onClick={toggleLike}
              variant="ghost"
              size="md"
              color={liked ? "red.500" : "gray.600"}
            />
            <Button
              leftIcon={<FaComment />}
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
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


