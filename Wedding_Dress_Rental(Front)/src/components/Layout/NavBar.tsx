import { Avatar, Heading, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useShowUser from "../../hooks/useShowUser";
const NavBar = () => {
  const Name = localStorage.getItem("userName");
  const user = useShowUser();

  console.log(Name);
  return (
    <HStack bgColor={"white"} h={"15vh"} spacing={1} p={4}>
      <Link to={"/useraccount"}>
      <Avatar size="xl" src={user.data?.data.photo} mx="auto"/>
      </Link>
      <Link to={"/useraccount"}>
        <Heading p={2} textColor={"gray.500"}>
          {Name}
        </Heading>
      </Link>
    </HStack>
  );
};

export default NavBar;
