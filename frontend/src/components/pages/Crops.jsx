import React, { useEffect, useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import axios from 'axios';

function Crops() {
    const [crops, setCrops] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/crop-service/crops')
            .then(response => {
                setCrops(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the crops!', error);
            });
    }, []);

    const handleRowClick = (index) => {
        const currentIndex = expandedRows.indexOf(index);
        const newExpandedRows = [...expandedRows];

        if (currentIndex === -1) {
            newExpandedRows.push(index);
        } else {
            newExpandedRows.splice(currentIndex, 1);
        }

        setExpandedRows(newExpandedRows);
    };

    return (
        <Box>
            <Heading mb={6} textAlign="center" color="teal.500">
                Crops
            </Heading>
            <Table variant="simple" mt={4}>
                <Thead>
                    <Tr>
                        <Th>Crop Name</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {crops.map((crop, index) => (
                        <React.Fragment key={index}>
                            <Tr onClick={() => handleRowClick(index)} cursor="pointer">
                                <Td>{crop.crop_name}</Td>
                            </Tr>
                            {expandedRows.includes(index) && crop.buyers.map((buyer, buyerIndex) => (
                                <Tr key={`${index}-${buyerIndex}`} style={{ backgroundColor: '#f9f9f9' }}>
                                    <Td pl={10}>
                                        <Text><strong>Buyer Name:</strong> {buyer.buyer_name}</Text>
                                        <Text><strong>Volume (kg):</strong> {buyer.volume_kg}</Text>
                                    </Td>
                                </Tr>
                            ))}
                        </React.Fragment>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}

export default Crops;