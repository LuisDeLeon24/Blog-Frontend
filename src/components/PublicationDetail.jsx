import React, { useState } from "react";
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Input,
  Button,
  IconButton,
  useToast,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { useComment } from "../shared/hooks"; 

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const CommentsList = React.memo(({ comments }) => {
  return (
    <VStack align="start" spacing={4}>
      {comments.length === 0 ? (
        <Text color="gray.500">Aún no hay comentarios.</Text>
      ) : (
        comments.map((comment, index) => (
          <Box
            key={comment._id || index}
            bg="white"
            p={3}
            borderRadius="md"
            boxShadow="sm"
            w="100%"
          >
            <HStack justify="space-between" w="100%">
              <Text fontWeight="semibold">{comment.author}</Text>
              {comment.createdAt && (
                <Text fontSize="xs" color="gray.500">
                  {formatDate(comment.createdAt)}
                </Text>
              )}
            </HStack>
            <Divider my={1} />
            <Text fontSize="sm">{comment.content}</Text>
          </Box>
        ))
      )}
    </VStack>
  );
});

const PublicationDetail = ({ publication }) => {
  if (!publication) return null;

  const { _id, title, description, photos = [], comments = [] } = publication;

  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showCommentInputs, setShowCommentInputs] = useState(false);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();

  const { postComment, loading, error } = useComment();

  const nextImage = () =>
    setCurrentImage((prev) => (photos.length ? (prev + 1) % photos.length : 0));
  const prevImage = () =>
    setCurrentImage((prev) => (photos.length ? (prev - 1 + photos.length) % photos.length : 0));

  const toggleLike = () => setLiked((prev) => !prev);

  const handleCommentSubmit = async () => {
    if (!author.trim() || !content.trim() || !_id) {
      toast({
        title: "Por favor completa todos los campos.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const res = await postComment({ author, content, publication: _id });

    if (res && !error) {
      setAuthor("");
      setContent("");
      toast({
        title: "Comentario enviado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Aquí no actualizamos el arreglo local.
      // Se espera que el padre o el backend actualicen la prop 'publication.comments'.
    } else if (error) {
      toast({
        title: "Error al enviar comentario.",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} gap={8}>
      <Box flex="2">
        {photos.length > 0 && (
          <Box position="relative">
            <Image
              src={photos[currentImage]}
              alt={`Imagen ${currentImage + 1} de ${title}`}
              borderRadius="md"
              objectFit="cover"
              w="100%"
              maxH="400px"
            />
            <Button
              position="absolute"
              top="50%"
              left="10px"
              onClick={prevImage}
              transform="translateY(-50%)"
              aria-label="Imagen anterior"
            >
              {"<"}
            </Button>
            <Button
              position="absolute"
              top="50%"
              right="10px"
              onClick={nextImage}
              transform="translateY(-50%)"
              aria-label="Siguiente imagen"
            >
              {">"}
            </Button>
          </Box>
        )}

        <VStack align="start" spacing={3} pt={4}>
          <Text fontWeight="bold" fontSize="2xl">
            {title}
          </Text>
          <Text>{description}</Text>

          <HStack spacing={4}>
            <IconButton
              icon={liked ? <FaHeart /> : <FaRegHeart />}
              onClick={toggleLike}
              aria-label="Like"
              color={liked ? "red.500" : "gray.600"}
              variant="ghost"
            />
            <Button
              leftIcon={<FaComment />}
              onClick={() => setShowCommentInputs(!showCommentInputs)}
            >
              Comentar
            </Button>
          </HStack>

          {showCommentInputs && (
            <VStack spacing={3} align="stretch" pt={4} w="100%">
              <Input
                placeholder="Tu nombre"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                isDisabled={loading}
              />
              <Input
                placeholder="Escribe tu comentario..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                isDisabled={loading}
              />
              <Button
                colorScheme="blue"
                onClick={handleCommentSubmit}
                isLoading={loading}
              >
                Enviar comentario
              </Button>
            </VStack>
          )}
        </VStack>
      </Box>

      <Box
        flex="1"
        bg="gray.50"
        p={4}
        borderRadius="md"
        overflowY="auto"
        maxH="600px"
      >
        <Text fontSize="lg" fontWeight="bold" mb={3}>
          Comentarios ({comments.length})
        </Text>
        <CommentsList comments={comments} />
      </Box>
    </Flex>
  );
};

export default PublicationDetail;




