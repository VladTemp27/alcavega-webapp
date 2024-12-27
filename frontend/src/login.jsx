import {ChakraProvider} from "@chakra-ui/react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './components/pages/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <Login />
    </ChakraProvider>
  </StrictMode>,
)
