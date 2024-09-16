import { Button, Container, Heading, HStack, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <Container maxW="container.sm">
      <VStack height="100vh" justifyContent="center">
        <Heading>Crie uma lista de tarefas</Heading>

        <HStack spacing={4}>
          <Button colorScheme="blue" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button colorScheme="blue" onClick={() => navigate("/register")}>
            Cadastre-se
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
}
