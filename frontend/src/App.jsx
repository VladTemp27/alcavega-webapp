import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Home from './components/pages/Home';
import Transactions from './components/pages/Transactions';
import CreateOrder from './components/pages/CreateOrder';
import Farmers from './components/pages/Farmers';
import Settings from './components/pages/Settings';

function App() {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" p="4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/transactions" element={<Transactions/>} />
          <Route path="/create-order" element={<CreateOrder/>} />
          <Route path="/farmers" element={<Farmers/>} />
          <Route path="/settings" element={<Settings/>} />
        </Routes>
      </Box>
    </Flex>
  );
}

export default App;