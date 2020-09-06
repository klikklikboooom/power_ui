import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRoomsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = useRoomsQuery();
  return (
    <>
      <NavBar />
      <div>Hello World</div>
      {!data ? (
        <div>Loading ...</div>
      ) : (
        data.rooms.map((r) => <div key={r.id}>{r.name}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
