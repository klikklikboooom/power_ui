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
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "./InputField";
import { useUpdateRoomMutation } from "../generated/graphql";
import { useRouter } from "next/router";

interface ModalProps {}

export const JoinGameModal: React.FC<ModalProps> = ({}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, updateRoom] = useUpdateRoomMutation();
  return (
    <>
      <Button float="right" onClick={onOpen}>
        Join Game
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Enter Code To Join Game</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{ code: "", id: -1, name: "" }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await updateRoom(values);
                  console.log(response);
                  if (response.data!.updateRoom!.errors) {
                    const errorMap = toErrorMap(
                      response.data!.updateRoom!.errors
                    );
                    setErrors(errorMap);
                  } else if (response.data!.updateRoom!.room) {
                    router.push("/create-room");
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField
                      label="Code"
                      placeholder="Enter Code"
                      name="code"
                    />
                    <Button
                      type="submit"
                      variantColor="teal"
                      mt={4}
                      isLoading={isSubmitting}
                    >
                      Join Game
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
