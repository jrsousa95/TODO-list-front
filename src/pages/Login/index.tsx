import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

const initialState = {
  email: "",
  password: "",
};

export function Login() {
  const [userData, setUserData] = useState(initialState);

  const auth = useContext(AuthContext);

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
      await auth.signIn(userData.email, userData.password);

      navigate("/tasks");
    } catch (error) {
      console.error(error);
      toast({
        title: "Email ou senha inválidos",
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
        <Heading>Login</Heading>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={userData.email}
            placeholder="Digite seu email"
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
            placeholder="Digite sua senha"
            onChange={handleChange}
            isRequired
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full">
          Entrar
        </Button>

        <Text>
          Não tem conta?{" "}
          <Text
            as="span"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Cadastrar
          </Text>
        </Text>

        <Text
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Voltar
        </Text>
      </VStack>
    </Container>
  );
}
