import React, { useEffect, useState } from "react";
import {
  VStack, Spinner, Text, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, useDisclosure
} from "@chakra-ui/react";

import { usePublications } from "../shared/hooks";
import PublicationCard from "./PublicationCards";
import PublicationDetail from "./PublicationDetail";

const PublicationsList = () => {
  const { publications, isFetching, error, fetchPublications } = usePublications();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPublication, setSelectedPublication] = useState(null);

  useEffect(() => {
    fetchPublications();
  }, []);

  const openModal = (publication) => {
    setSelectedPublication(publication);
    onOpen();
  };

  return (
    <>
      {isFetching && <Spinner size="xl" />}
      {error && <Text color="red.500">Error: {error.toString()}</Text>}
      {!isFetching && publications?.length === 0 && <Text>No hay publicaciones.</Text>}

      <VStack spacing={6} align="stretch">
        {publications?.map((pub) => (
          <PublicationCard key={pub._id} publication={pub} onClick={() => openModal(pub)} />
        ))}
      </VStack>

      <Modal
  isOpen={isOpen}
  onClose={onClose}
  size="6xl" 
  isCentered
  scrollBehavior="inside"
>
  <ModalOverlay />
  <ModalContent maxW="90vw" maxH="90vh">
    <ModalHeader>{selectedPublication?.title}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {selectedPublication && <PublicationDetail publication={selectedPublication} />}
    </ModalBody>
  </ModalContent>
</Modal>
    </>
  );
};

export default PublicationsList;
