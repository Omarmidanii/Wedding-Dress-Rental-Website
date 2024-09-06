import { Box, Heading, Link as L } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Background3 from "../assets/Background2.jpg";
import { LoginForm } from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

interface Props {
  Login: boolean;
}
const AuthPage = ({ Login }: Props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bgImage={`url(${Background3})`}
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        w={["90%", "70%", "50%", "30%"]}
        h="auto"
        bg="none"
        p={6}
        borderRadius={20}
        transition="all 0.3s ease"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "lg",
          borderRadius: "md",
        }}
      >
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          {Login ? "Login" : "Register"}
        </Heading>
        {Login ? <LoginForm /> : <RegisterForm />}
        <Link to={Login ? "/register" : "/login"}>
          <L color="blue.500" display="block" textAlign="center" mt={4}>
            {Login ? "Not registered yet?" : "Already have an accout?"}
          </L>
        </Link>
        {Login && 
        <Link to={'forget-password'}>
          <L color={"blue.500"} display={"black"} textAlign={'center'} mt={4}>
            {"Forget Password?"}
          </L>
        </Link>
        }
      </Box>
    </Box>
  );
};

export default AuthPage;
