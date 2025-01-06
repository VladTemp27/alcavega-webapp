import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  useToast,
  Spinner,
  Center,
  Stack,
  Avatar,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/farmer-service/farmers');
      setFarmers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching farmers:', error);
      toast({
        title: 'Error.',
        description: 'There was an error fetching the farmers.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Heading mb={6} textAlign="center" color="teal.500">
        Farmers
      </Heading>
      <List spacing={4}>
        {farmers.map((farmer, index) => (
          <ListItem key={index} p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Flex alignItems="center">
              <Avatar name={`${farmer.farmer_data.first_name} ${farmer.farmer_data.last_name}`} mr={4} />
              <Stack spacing={1}>
                <Text fontWeight="bold" fontSize="lg">
                  {farmer.farmer_data.first_name} {farmer.farmer_data.last_name}
                </Text>
                <Text color="gray.600">{farmer.farmer_data.phone_number}</Text>
                <Text color="gray.500">{farmer.farmer_data.address}</Text>
              </Stack>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Farmers;