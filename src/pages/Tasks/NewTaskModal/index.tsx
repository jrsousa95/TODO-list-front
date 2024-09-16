import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent } from "react";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  task: {
    title: string;
  };
  handleSubmit: (event: FormEvent) => void;
}

export default function NewTaskModal({
  isOpen,
  onClose,
  task,
  handleChange,
  handleSubmit,
}: NewTaskModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as="form"
        gap="10px"
        justifyContent="center"
        onSubmit={handleSubmit}
      >
        <ModalHeader>Cadastro de Nova tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              isRequired
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <HStack width="full">
            <Button colorScheme="blue" type="submit" width="full">
              Cadastrar
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
