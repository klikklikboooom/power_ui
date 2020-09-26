import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Button } from "@chakra-ui/core";
import { useCreateRoomMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

const CreateRoom: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createRoom] = useCreateRoomMutation();
  useIsAuth();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ name: "" }}
        onSubmit={async (values) => {
          const { error } = await createRoom(values);

          if (!error) {
            router.push("/");
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
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateRoom);
