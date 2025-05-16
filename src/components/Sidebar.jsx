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
    <Button variant="ghost" onClick={() => onLinkClick('home')}>Tecnología</Button>
    <Button variant="ghost" onClick={() => onLinkClick('about')}>Taller</Button>
    <Button variant="ghost" onClick={() => onLinkClick('contact')}>Práctica Supervisada</Button>
  </VStack>
);

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLinkClick = (route) => {
    console.log(`Navigating to: ${route}`);
    onClose();
  };

  return (
    <>
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
        {/* Zona izquierda con avatar y menú */}
        <Flex align="center" gap={3}>
          
          {/* Botón del sidebar */}
          <IconButton
            icon={<FaBars />}
            aria-label="Abrir menú lateral"
            variant="ghost"
            onClick={onOpen}
          />

          {/* Menús */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
              Proyectos
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => console.log('Product A')}>Almacenadora</MenuItem>
              <MenuItem onClick={() => console.log('Product B')}>Gestor de Hoteles</MenuItem>
              <MenuItem onClick={() => console.log('Product C')}>Blog Personal (Backend)</MenuItem>
              <MenuItem onClick={() => console.log('Product C')}>Blog Personal (Frontend)</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
              Github
            </MenuButton>
          </Menu>
        </Flex>

        <Spacer />

        {/* Título centrado */}
        <Box fontWeight="bold" fontSize="lg" color="gray.700" marginRight="1%">
          Luis De León
        </Box>

        

        {/* Avatar circular */}
          <Avatar
            size="sm"
            name="Luis Eduardo"
            src="https://th.bing.com/th/id/R.d51eaa96b13a2083095b031a736eb121?rik=uUGNMBDeYtxMXQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f-7D2wuu1pwec%2fUeGODZmJtTI%2fAAAAAAAAAEg%2f9X3VvZEPu4I%2fs1600%2fSIMBOLO%2bBIOHAZARD.png&ehk=Z8tXKi%2b6%2bWYDPRtZ6UwSSYX5bAAHHPqJu5eJ3mguZ%2fU%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" // Reemplaza esta URL con tu imagen real
          />

      </Flex>

      {/* Drawer lateral */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontWeight="bold">Navegación</DrawerHeader>
          <DrawerBody>
            <SidebarContent onLinkClick={handleLinkClick} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
