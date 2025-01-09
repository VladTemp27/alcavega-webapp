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
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFarmer, setNewFarmer] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
  });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFarmer({ ...newFarmer, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      var payload = {farmer_data: newFarmer}
      const response = await axios.post('http://localhost:8080/api/farmer-service/farmer', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setFarmers([...farmers, response.data]);
      toast({
        title: 'Success.',
        description: 'Farmer added successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setIsModalOpen(false);
      setNewFarmer({ first_name: '', last_name: '', phone_number: '', address: '' });
    } catch (error) {
      console.error('Error creating farmer:', error);
      toast({
        title: 'Error.',
        description: 'There was an error creating the farmer.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
      <Button onClick={() => setIsModalOpen(true)} colorScheme="teal" mb={4}>
        Add Farmer
      </Button>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Farmer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                name="first_name"
                value={newFarmer.first_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="last_name"
                value={newFarmer.last_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phone_number"
                value={newFarmer.phone_number}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                value={newFarmer.address}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Farmers;