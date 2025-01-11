import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
    HStack,
    Collapse,
    Heading,
    IconButton
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons';

function CreateOrder() {
    const [farmers, setFarmers] = useState([]);
    const [farmerOptions, setFarmerOptions] = useState([]);
    const [currentFarmer, setCurrentFarmer] = useState('');
    const [currentCrop, setCurrentCrop] = useState('');
    const [currentKg, setCurrentKg] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [currentSize, setCurrentSize] = useState('');
    const [openFarmer, setOpenFarmer] = useState(null);

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/farmer-service/farmers');
                if (Array.isArray(response.data)) {
                    const formattedFarmers = response.data.map(farmer => ({
                        id: farmer._id,
                        name: `${farmer.farmer_data.first_name} ${farmer.farmer_data.last_name}`
                    }));
                    setFarmerOptions(formattedFarmers);
                } else {
                    console.error('Error: API response is not an array');
                }
            } catch (error) {
                console.error('Error fetching farmers:', error);
            }
        };

        fetchFarmers();
    }, []);

    const addBag = () => {
        if (!currentFarmer || !currentCrop || !currentKg || !currentPrice || !currentSize) return;

        setFarmers(prevFarmers => {
            const farmerIndex = prevFarmers.findIndex(farmer => farmer.id === currentFarmer);
            if (farmerIndex > -1) {
                const updatedFarmers = [...prevFarmers];
                updatedFarmers[farmerIndex].bags.push({ crop: currentCrop, kg: currentKg, price: currentPrice, size: currentSize });
                return updatedFarmers;
            } else {
                const selectedFarmer = farmerOptions.find(farmer => farmer.id === currentFarmer);
                return [...prevFarmers, { id: currentFarmer, name: selectedFarmer.name, bags: [{ crop: currentCrop, kg: currentKg, price: currentPrice, size: currentSize }] }];
            }
        });

        setCurrentFarmer('');
        setCurrentCrop('');
        setCurrentKg('');
        setCurrentPrice('');
        setCurrentSize('');
    };

    const deleteBag = (farmerIndex, bagIndex) => {
        const updatedFarmers = [...farmers];
        updatedFarmers[farmerIndex].bags.splice(bagIndex, 1);
        if (updatedFarmers[farmerIndex].bags.length === 0) {
            updatedFarmers.splice(farmerIndex, 1);
        }
        setFarmers(updatedFarmers);
    };

    const calculateTotalPrice = (bags) => {
        return bags.reduce((total, bag) => total + (bag.kg * bag.price), 0);
    };

    const toggleFarmer = (index) => {
        setOpenFarmer(openFarmer === index ? null : index);
    };

    return (
        <Box p={4}>
            <VStack spacing={4} align="stretch">
                <FormControl>
                    <FormLabel>Farmer Name</FormLabel>
                    <Select
                        value={currentFarmer}
                        onChange={(e) => setCurrentFarmer(e.target.value)}
                        placeholder="Select farmer"
                    >
                        {farmerOptions.map(farmer => (
                            <option key={farmer.id} value={farmer.id}>
                                {farmer.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Crop</FormLabel>
                    <Select
                        value={currentCrop}
                        onChange={(e) => setCurrentCrop(e.target.value)}
                        placeholder="Select crop"
                    >
                        <option value="Wheat">Wheat</option>
                        <option value="Corn">Corn</option>
                        <option value="Rice">Rice</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Kg per Bag</FormLabel>
                    <Input
                        type="number"
                        value={currentKg}
                        onChange={(e) => setCurrentKg(e.target.value)}
                        placeholder="Enter kg per bag"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Price per Kg</FormLabel>
                    <Input
                        type="number"
                        value={currentPrice}
                        onChange={(e) => setCurrentPrice(e.target.value)}
                        placeholder="Enter price per kg"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Size Classification</FormLabel>
                    <Input
                        value={currentSize}
                        onChange={(e) => setCurrentSize(e.target.value)}
                        placeholder="Enter size classification"
                    />
                </FormControl>
                <Button onClick={addBag}>Add Bag</Button>
            </VStack>

            <Box mt={8}>
                {farmers.map((farmer, index) => (
                    <Box key={index} mb={4} borderWidth="1px" borderRadius="lg" p={4}>
                        <HStack justifyContent="space-between" onClick={() => toggleFarmer(index)} cursor="pointer">
                            <Heading as="h2" size="md">
                                {farmer.name}
                            </Heading>
                            <IconButton
                                icon={openFarmer === index ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                variant="ghost"
                                aria-label="Toggle Farmer"
                            />
                        </HStack>
                        <Box mt={2}>
                            <strong>Total Bags: {farmer.bags.length}</strong>
                        </Box>
                        <Box mt={2}>
                            <strong>Total Price: {calculateTotalPrice(farmer.bags)}</strong>
                        </Box>
                        <Collapse in={openFarmer === index} animateOpacity>
                            <Table variant="simple" mt={4}>
                                <Thead>
                                    <Tr>
                                        <Th>Crop</Th>
                                        <Th>Kg per Bag</Th>
                                        <Th>Price per Kg</Th>
                                        <Th>Size Classification</Th>
                                        <Th>Total Price</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {farmer.bags.map((bag, bagIndex) => (
                                        <Tr key={bagIndex}>
                                            <Td>{bag.crop}</Td>
                                            <Td>{bag.kg}</Td>
                                            <Td>{bag.price}</Td>
                                            <Td>{bag.size}</Td>
                                            <Td>{bag.kg * bag.price}</Td>
                                            <Td>
                                                <IconButton
                                                    icon={<DeleteIcon />}
                                                    onClick={() => deleteBag(index, bagIndex)}
                                                    aria-label="Delete Bag"
                                                />
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Collapse>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default CreateOrder;