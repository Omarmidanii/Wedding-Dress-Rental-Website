import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import User from "../../entities/User";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import {
  MdLockOutline,
  MdOutlineMail,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";

const RegisterForm = () => {
  const { mutate, status, isError } = useAuth("register");
  const isLoading = status === "pending";

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const handleRegister = (values: User) => {
    mutate({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };
  const validationsLogin = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleRegister}
      validationSchema={validationsLogin}
    >
      <Form>
        {isError && <Text color="red.700">Check Your Email or Password</Text>}
        <Box paddingTop={"20px"}>
          <FormControl id="name" pb={"20px"}>
            <FormLabel fontFamily={"cursive"}>Name</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaUser color="black" />}
              />
              <Field
                name="name"
                as={Input}
                type="text"
                placeholder="Name"
                outlineColor="black"
                _placeholder={{ color: "gray.700" }}
                borderRadius={"20"}
                width={"full"}
                pl={"30px"}
              />
            </InputGroup>
            <ErrorMessage name="name">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="email">
            <FormLabel fontFamily={"cursive"}>Email</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdOutlineMail color="black" />}
              />
              <Field
                name="email"
                as={Input}
                type="email"
                outlineColor="black"
                placeholder="Email"
                _placeholder={{ color: "gray.700" }}
                borderRadius={"20"}
                width={"full"}
                pl={"30px"}
              />
            </InputGroup>
            <ErrorMessage name="email">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="password" marginTop={5}>
            <FormLabel fontFamily={"cursive"}>Password</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdLockOutline color="black" />}
              />
              <Field
                name="password"
                as={Input}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                outlineColor="black"
                _placeholder={{ color: "gray.700" }}
                borderRadius={"20"}
                width={"full"}
                pl={"30px"}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={toggleShowPassword}
                  bg='none'
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <ErrorMessage name="password">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <Button
            bgColor={"red.600"}
            color={"white"}
            width="full"
            type="submit"
            marginTop={5}
            borderRadius={"20"}
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
