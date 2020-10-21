import { Room } from "../generated/graphql";
import { Box, Button, Flex } from "@chakra-ui/core";
import { JoinGameModal } from "./joinGameModal";

interface ListProps {
  rooms: ({
    __typename?: "Room" | undefined;
  } & Pick<Room, "id" | "createdAt" | "updatedAt" | "name">)[];
}

export const Rooms: React.FC<ListProps> = ({ rooms }) => {
  return (
    <Box>
      {rooms.map((r) => (
        <Box mt={5}>
          <Box key={r.id} p={5} shadow="md" borderBottomWidth="1px">
            {r.name} <JoinGameModal />
          </Box>
          <br></br>
        </Box>
      ))}
    </Box>
  );
};
