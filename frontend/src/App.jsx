import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Home from './components/pages/Home';

function App() {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" p="4">
        <Routes>
          <Route path="/" component={Home} />
        </Routes>
      </Box>
    </Flex>
  );
}

export default App;