import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  CloseButton,
  Container,
  Heading,
  HStack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";
import { taskApi } from "../../hooks/tasksApi";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskResponse {
  message: string;
  data: Task[];
}

export function Tasks() {
  const taskAPI = taskApi();
  const toast = useToast();

  const {
    data: response,
    fetchData: fetchTasks,
    loading,
  } = useFetch<TaskResponse>({
    method: "get",
    url: "/tasks",
    authenticated: true,
    autoFetch: true,
  });

  const tasks = response?.data;
  const hasTasks = !loading && tasks?.length;

  async function handleDeleteTask(id: number) {
    try {
      await taskAPI.deleteTask(id);
      fetchTasks();
    } catch (error) {
      toast({
        title: "Erro ao deletar tarefa",
        description: `${error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Container maxW="container.md">
      <VStack gap="10px" mt="20px" justifyContent="center">
        <Heading>Tarefas</Heading>

        {hasTasks ? (
          tasks?.map((task) => (
            <Card minW="300px" key={task.id}>
              <CardHeader>
                <HStack justifyContent="space-between">
                  <HStack>
                    <Checkbox
                      size="md"
                      colorScheme="blue"
                      isChecked={task.completed}
                    />
                    <Heading size="sm">{task.title}</Heading>
                  </HStack>

                  <CloseButton onClick={() => handleDeleteTask(task.id)} />
                </HStack>
              </CardHeader>
            </Card>
          ))
        ) : (
          <Heading>Nenhuma tarefa criada</Heading>
        )}

        <Button colorScheme="blue">Nova Tarefa</Button>
      </VStack>
    </Container>
  );
}
