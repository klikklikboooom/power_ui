import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { useCreateRoomMutation } from "../generated/graphql";
import { InputField } from "./InputField";
import { useRouter } from "next/router";

interface ModalProps {}

export const CreateGameModal: React.FC<ModalProps> = ({}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, createRoom] = useCreateRoomMutation();
  return (
    <>
      <Button mr={5} ml="auto" onClick={onOpen}>
        Create Game
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Enter Code To Join Game</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{ name: "" }}
                onSubmit={async (values) => {
                  const { error, data } = await createRoom(values);
                  console.log(error);
                  console.log("response", data?.createRoom);
                  if (!error) {
                    router.push(`/room/${data?.createRoom.code}`);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField
                      label="Room Name"
                      placeholder="Name your room (Optional)"
                      name="name"
                    />

                    <Button
                      type="submit"
                      variantColor="teal"
                      mt={4}
                      isLoading={isSubmitting}
                    >
                      Create Room
                    </Button>
                    <Button
                      variantColor="blue"
                      float="right"
                      mt={4}
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </Form>
                )}
              </Formik>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
