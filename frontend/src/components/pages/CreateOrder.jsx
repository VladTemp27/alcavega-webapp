import React, { useState } from 'react';
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
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

function CreateOrder() {
    const [farmers, setFarmers] = useState([]);
    const [currentFarmer, setCurrentFarmer] = useState('');
    const [currentCrop, setCurrentCrop] = useState('');
    const [currentKg, setCurrentKg] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [currentSize, setCurrentSize] = useState('');
    const [openFarmer, setOpenFarmer] = useState(null);

    const addBag = () => {
        if (!currentFarmer || !currentCrop || !currentKg || !currentPrice || !currentSize) return;

        setFarmers(prevFarmers => {
            const farmerIndex = prevFarmers.findIndex(farmer => farmer.name === currentFarmer);
            if (farmerIndex > -1) {
                const updatedFarmers = [...prevFarmers];
                updatedFarmers[farmerIndex].bags.push({ crop: currentCrop, kg: currentKg, price: currentPrice, size: currentSize });
                return updatedFarmers;
            } else {
                return [...prevFarmers, { name: currentFarmer, bags: [{ crop: currentCrop, kg: currentKg, price: currentPrice, size: currentSize }] }];
            }
        });

        setCurrentFarmer('');
        setCurrentCrop('');
        setCurrentKg('');
        setCurrentPrice('');
        setCurrentSize('');
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
                    <Input
                        value={currentFarmer}
                        onChange={(e) => setCurrentFarmer(e.target.value)}
                        placeholder="Enter farmer name"
                    />
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