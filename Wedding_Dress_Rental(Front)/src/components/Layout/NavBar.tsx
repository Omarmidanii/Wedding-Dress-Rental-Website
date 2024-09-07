import { Avatar,  Button, Heading, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useShowUser from "../../hooks/useShowUser";
import useLogout from "../../hooks/useLogout";
const NavBar = () => {
  const Name = localStorage.getItem("userName");
  const user = useShowUser();
  const logout = useLogout();
  return (
    <HStack bgColor={"white"} h={"15vh"} spacing={1} p={4} justifyContent={'space-between'}>
      <HStack spacing={1} p={4}>
        <Link to={"/useraccount"}>
          <Avatar size="xl" src={user.data?.data.photo} mx="auto" />
        </Link>
        <Link to={"/useraccount"}>
          <Heading p={2} textColor={"gray.500"}>
            {Name}
          </Heading>
        </Link>
      </HStack>

      <Button textAlign={"center"} colorScheme="gray" onClick={() => {
        localStorage.removeItem("token");
        logout.mutate();
      }}>Logout</Button>
    </HStack>
  );
};

export default NavBar;
