import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardHeader,
  Center,
  CloseButton,
  Container,
  Heading,
  HStack,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { taskApi } from "../../hooks/tasksApi";
import useFetch from "../../hooks/useFetch";
import { userApi } from "../../hooks/userApi";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import NewTaskModal from "./NewTaskModal";
import { useNavigate } from "react-router-dom";

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
  const userAPI = userApi();
  const taskAPI = taskApi();
  const toast = useToast();
  const navigate = useNavigate();

  const [newTask, setNewTask] = useState<Task>({} as Task);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const {
    isOpen: isOpenConfirmDelete,
    onOpen: onOpenConfirmDelete,
    onClose: onCloseConfirmDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenNewTask,
    onOpen: onOpenNewTask,
    onClose: onCloseNewTask,
  } = useDisclosure();

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

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setNewTask({ ...newTask, [name]: value });
  }

  async function handleDeleteTask(id: number) {
    setSelectedTaskId(id);
    onOpenConfirmDelete();
  }

  async function handleCompleteTask(id: number) {
    try {
      const task = tasks?.find((task) => task.id === id);

      if (!task) return;

      await taskAPI.updateTask(id, task.title, !task.completed);

      toast({
        title: "Tarefa atualizada",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      fetchTasks();
    } catch (error) {
      console.error(error);

      toast({
        title: "Erro ao atualizar tarefa",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  async function confirmDeleteTask() {
    try {
      if (selectedTaskId) {
        await taskAPI.deleteTask(selectedTaskId);
        fetchTasks();

        toast({
          title: "Tarefa deletada",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        onCloseConfirmDelete();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao deletar tarefa",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await taskAPI.createTask(newTask.title);
      fetchTasks();
      setNewTask({} as Task);
      onCloseNewTask();

      toast({
        title: "Tarefa criada",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao criar tarefa",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  async function signOut() {
    userAPI.signOut();

    navigate("/login");
  }

  return (
    <>
      <Center mt={0} width="full" justifyContent="end">
        <Button
          colorScheme="red"
          borderTopRadius={0}
          borderRightRadius={0}
          onClick={signOut}
        >
          Sair
        </Button>
      </Center>
      <Container maxW="container.md">
        <VStack gap="10px" mt="20px" justifyContent="center">
          <Heading>Lista de Tarefas</Heading>

          {hasTasks ? (
            tasks?.map((task) => (
              <Card
                width="full"
                key={task.id}
                border={
                  task.completed ? "2px solid #12a212" : "2px solid #DCDCDC"
                }
              >
                <CardHeader>
                  <HStack justifyContent="space-between">
                    <HStack>
                      <CheckIcon
                        color={task.completed ? "green" : "gray"}
                        cursor="pointer"
                        onClick={() => handleCompleteTask(task.id)}
                      />

                      <Heading size="sm">{task.title}</Heading>
                    </HStack>

                    <CloseButton onClick={() => handleDeleteTask(task.id)} />
                  </HStack>
                </CardHeader>
              </Card>
            ))
          ) : (
            <Heading
              mt="20px"
              fontSize="md"
              color="gray.500"
              fontWeight="normal"
            >
              Nenhuma tarefa criada
            </Heading>
          )}

          <Button
            colorScheme="blue"
            width="full"
            onClick={onOpenNewTask}
            leftIcon={<AddIcon />}
          >
            Nova Tarefa
          </Button>
        </VStack>

        <ConfirmDeleteModal
          isOpen={isOpenConfirmDelete}
          onClose={onCloseConfirmDelete}
          onConfirm={confirmDeleteTask}
        />

        <NewTaskModal
          isOpen={isOpenNewTask}
          onClose={onCloseNewTask}
          task={newTask}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    </>
  );
}
