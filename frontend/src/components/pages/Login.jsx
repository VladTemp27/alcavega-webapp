import { Stack, HStack, VStack ,Box, Image, Flex } from '@chakra-ui/react'
import { Input,Button } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'

  import { Card, CardBody, CardHeader, CardFooter, Heading } from '@chakra-ui/react'

function LoginForm(){
    return(
        <Card minW={{ base: '40%'}}>
            <CardHeader>
                <Heading as='h2' size='lg'>Log-in</Heading>
            </CardHeader>
            <CardBody>
                <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input placeholder="Username" />
                    <FormLabel>Password</FormLabel>
                    <Input placeholder='Password'/>
                    <Button
                    mt={4}
                    colorScheme='teal'
                    type='submit'
                >
                    Submit
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
                src='/./logo.png'
                alt='Dan Abramov'
                marginBottom={4}
            />
            <LoginForm/>
        </Flex>
    </Box>
  );
}

export default Login;