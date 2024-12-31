import React from "react";
import { Box, VStack, HStack, Icon, Text } from "@chakra-ui/react";
import { FaHome, FaChartLine, FaCompass, FaStar, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { icon: FaHome, label: "Home", onClick: () => console.log("Redirecting to Home...") },
    { icon: FaChartLine, label: "Trending", onClick: () => console.log("Redirecting to Trending...") },
    { icon: FaCompass, label: "Explore", onClick: () => console.log("Redirecting to Explore...") },
    { icon: FaStar, label: "Favourites", onClick: () => console.log("Redirecting to Favourites...") },
    { icon: FaCog, label: "Settings", onClick: () => console.log("Redirecting to Settings...") },
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
          Logo
        </Text>
        {menuItems.map((item) => (
          <HStack
            key={item.label}
            spacing={4}
            p={2}
            borderRadius="md"
            cursor="pointer"
            onClick={item.onClick} // Attach onClick event
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
