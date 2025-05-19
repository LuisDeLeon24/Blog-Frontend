import {
  Box,
  Flex,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Spacer,
  useDisclosure,
  Avatar,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaBars } from 'react-icons/fa';
import React from 'react';

const SidebarContent = ({ onLinkClick }) => (
  <VStack spacing={4} align="stretch" mt={4}>
    <Button variant="ghost" onClick={() => onLinkClick('all')}>Todas</Button> {/* Botón "Todas" */}
    <Button variant="ghost" onClick={() => onLinkClick('Tecnologia')}>Tecnología</Button>
    <Button variant="ghost" onClick={() => onLinkClick('Taller')}>Taller</Button>
    <Button variant="ghost" onClick={() => onLinkClick('Practica_Supervisada')}>Práctica Supervisada</Button>
  </VStack>
);

const Sidebar = ({ onFilterChange, activeFilter }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLinkClick = (route) => {
    onFilterChange(route); // Cambia el filtro
    onClose(); // Cierra el sidebar
  };

  return (
    <>
      {/* nav principal */}
      <Flex
        as="nav"
        bg="gray.50"
        p={4}
        align="center"
        boxShadow="sm"
        position="sticky"
        top={0}
        zIndex={1000}
      >
        <Flex align="center" gap={3}>
          <IconButton
            icon={<FaBars />}
            aria-label="Abrir menú lateral"
            variant="ghost"
            onClick={onOpen}
          />

          {/* Menús de proyectos */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
              Proyectos
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => console.log('Almacenadora')}>Almacenadora</MenuItem>
              <MenuItem onClick={() => console.log('Gestor de Hoteles')}>Gestor de Hoteles</MenuItem>
              <MenuItem onClick={() => console.log('Blog Backend')}>Blog Personal (Backend)</MenuItem>
              <MenuItem onClick={() => console.log('Blog Frontend')}>Blog Personal (Frontend)</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
              Github
            </MenuButton>
          </Menu>
        </Flex>

        <Spacer />
        <Box fontWeight="bold" fontSize="lg" color="gray.700" marginRight="1%">
          Luis De León
        </Box>
        <Avatar
          size="sm"
          name="Luis Eduardo"
          src=""
        />
      </Flex>

      {/* Drawer lateral */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontWeight="bold">Navegación</DrawerHeader>
          <DrawerBody>
            <SidebarContent
              onLinkClick={handleLinkClick}
              activeFilter={activeFilter}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
