import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  HStack,
} from "@chakra-ui/react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Deseja excluir esta tarefa?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Essa operação não poderá ser desfeita.</Text>
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button colorScheme="blue" onClick={onClose}>
              Não
            </Button>
            <Button variant="ghost" onClick={onConfirm}>
              Sim
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
