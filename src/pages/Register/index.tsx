import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../hooks/userApi";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export function Register() {
  const [userData, setUserData] = useState(initialState);
  const api = userApi();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("AUTH_TOKEN")) {
      toast({
        title: "Login realizado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/tasks");
    }
  }, [navigate, toast]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setUserData({ ...userData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await api.register(userData.name, userData.email, userData.password);

      toast({
        title: "Cadastrado com sucesso",
        description: "Agora realize seu login",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao cadastrar",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
  return (
    <Container maxW="container.md">
      <VStack
        as="form"
        gap="10px"
        height="100vh"
        justifyContent="center"
        onSubmit={handleSubmit}
      >
        <Heading>Cadastro</Heading>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            isRequired
          />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            isRequired
          />
        </FormControl>

        <FormControl>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            isRequired
          />
        </FormControl>

        <Button colorScheme="blue" type="submit" width="full">
          Cadastrar
        </Button>
      </VStack>
    </Container>
  );
}
