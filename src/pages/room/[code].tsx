import { NextPage } from "next";
import { Box } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
// import { Hand } from "react-casino";
import "cardsJS";

const Room: NextPage = () => {
  return (
    <Box m="auto" mt={250} width="50%" height={500} backgroundColor="green.500">
      <div
        className="hand"
        data-bind='hand: {flow: "horizontal", spacing: 0.4, width: 90, cards: cards}'
      ></div>
      {/* <Hand
        follow="C"
        trump="S"
        cards={[
          { suit: "S", face: "A" },
          { suit: "D", face: "A" },
        ]}
        onClick={() => console.log(`Clicked`)}
      /> */}
    </Box>
  );
  // return (
  //   <Box
  //     m="auto"
  //     mt={250}
  //     width="50%"
  //     height={500}
  //     backgroundColor="green.500"
  //   >

  //   </Box>
  // );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Room);
