import {
    Stack,
    HStack,
    VStack,
    Box,
    Image,
    Flex,
    Input,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Heading
} from '@chakra-ui/react';
import axios from 'axios'
import React from 'react';

async function handleLogin(event, username, password){
    event.preventDefault();
    try{
        const response = await axios.post('http://localhost:8080/auth/login', {
            username,
            password
        });
        console.log(response.data);
        sessionStorage.setItem('token', response.data.token);
        console.log('Token saved to session storage');
    }catch(error){
        console.error(error);
    }
}

function LoginForm({onSubmit}){
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return(
        <Card minW={{ base: '40%'}}>
            <CardHeader>
                <Heading as='h2' size='lg'>Log-in</Heading>
            </CardHeader>
            <CardBody>
                <FormControl as="form" isRequired onSubmit={(event) => onSubmit(event, username, password)}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        placeholder="Username" 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <FormLabel>Password</FormLabel>
                    <Input 
                        placeholder='Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button
                    mt={4}
                    colorScheme='teal'
                    type='submit'
                >
                    Log-in
                </Button>
                </FormControl>
            </CardBody>
        </Card>
    )
}

function Login() {
  return (
    <Box
    p={4}
    >
        <Flex
            justifyContent='center'
            alignItems='center'
            direction='column'
        >
            <Image
                borderRadius='full'
                boxSize='150px'
                src='/logo.png'
                alt='Alcavega'
                marginBottom={4}
            />
            <LoginForm onSubmit={handleLogin}/>
        </Flex>
    </Box>
  );
}

export default Login;