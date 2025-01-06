import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/farmer-service/farmers');
      setFarmers(response.data);
    } catch (error) {
      console.error('Error fetching farmers:', error);
      toast({
        title: 'Error.',
        description: 'There was an error fetching the farmers.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Farmers</Heading>
      <List spacing={3}>
        {farmers.map((farmer, index) => (
          <ListItem key={index}>
            <Text>
              {farmer.farmer_data.first_name} {farmer.farmer_data.last_name} - {farmer.farmer_data.phone_number}
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Farmers;