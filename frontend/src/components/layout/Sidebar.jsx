import React from "react";
import { Box, VStack, HStack, Icon, Text } from "@chakra-ui/react";
import { FaHome, FaChartLine, FaCog } from "react-icons/fa";
import { FaAddressBook, FaCashRegister } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: FaHome, label: "Home", path: "/" },
    { icon: FaChartLine, label: "Transactions", path: "/transactions" },
    { icon: FaCashRegister, label: "Create order", path: "/create-order" },
    { icon: FaAddressBook, label: "Farmers", path: "/farmers" },
    { icon: FaCog, label: "Settings", path: "/settings" },
  ];

  const brandGreen = "#3E854D"; // Main green from the logo
  const brandDarkGreen = "#2B6538"; // Darker green for hover effect

  return (
    <Box
      bg="gray.100"
      w="240px"
      h="100vh"
      p={4}
      borderRight="1px solid"
      borderColor="gray.200"
    >
      <VStack align="start" spacing={6}>
        <Text fontSize="2xl" fontWeight="bold" color={brandGreen}>
          Alcavega
        </Text>
        {menuItems.map((item) => (
          <HStack
            key={item.label}
            spacing={4}
            p={2}
            borderRadius="md"
            cursor="pointer"
            onClick={() => navigate(item.path)} // Navigate to the path
            bg={location.pathname === item.path ? brandGreen : "transparent"}
            color={location.pathname === item.path ? "white" : "black"}
            _hover={{
              bg: brandGreen,
              color: "white",
            }}
            transition="background-color 0.3s, color 0.3s"
          >
            <Icon as={item.icon} boxSize={5} />
            <Text fontSize="lg">{item.label}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;