import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRoomsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Button, Box, Flex, Heading } from "@chakra-ui/core";
import { Router } from "next/router";
import { Rooms } from "../components/RoomList";
import { useRouter } from "next/router";
import { JoinGameModal } from "../components/joinGameModal";

const Index = () => {
  const router = useRouter();
  const [{ data, fetching }] = useRoomsQuery({
    variables: {
      limit: 10,
    },
  });

  if (!fetching && !data) {
    return <div color="red">Internal Server Error</div>;
  }
  return (
    <Layout>
      <Flex align="left">
        <Heading>Power!</Heading>
        <Button mr={5} ml="auto" onClick={() => router.push("/create-room")}>
          Create Game
        </Button>
        <JoinGameModal />
      </Flex>

      <br></br>
      <Heading size="md">Live Games</Heading>
      {!data && fetching ? (
        <div>Loading ...</div>
      ) : (
        <Rooms rooms={data!.rooms} />
      )}
      <Flex>
        <Button mt={8} mr="auto">
          Previous
        </Button>

        <Button mt={8} ml="auto">
          Next
        </Button>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
