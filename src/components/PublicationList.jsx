import React, { useEffect } from "react";
import { VStack, Spinner, Text } from "@chakra-ui/react";
import PublicationCard from "./PublicationCards"; // Ajusta la ruta si es necesario
import { usePublications } from "../shared/hooks"; // Ajusta la ruta si es necesario

const PublicationsList = () => {
  const { publications, isFetching, error, fetchPublications } = usePublications();

  useEffect(() => {
    fetchPublications();
  }, []);

  if (isFetching) return <Spinner size="xl" label="Cargando publicaciones..." />;
  if (error) return <Text color="red.500">Error: {error.toString()}</Text>;
  if (publications.length === 0) return <Text>No hay publicaciones para mostrar</Text>;

  return (
    <VStack spacing={4} align="stretch"> {/* align="stretch" makes children take full width */}
      {publications.map((publication, index) => (
        <PublicationCard key={index} publication={publication} />
      ))}
    </VStack>
  );
};

export default PublicationsList;