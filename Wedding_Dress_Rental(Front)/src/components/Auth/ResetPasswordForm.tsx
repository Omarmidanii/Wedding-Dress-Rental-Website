import { Box, Button, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CgPassword } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import Background3 from "../../assets/Background2.jpg";
import usePost from "../../hooks/usePost";
import useErrorStore from "../../stores/errorStore";

interface ResetPassword{
    password : string;
    passwordConfirmation : string;
}

const ResetPasswordForm = () => {
    const { token, email } = useParams();
    const navigate = useNavigate();
    const {mutate , isPending , error , isSuccess} = usePost<{message : string;} , FormData>('reset-password');
    const { message } = useErrorStore();
  const handleSubmit = (values: ResetPassword) => {
    const data = new FormData();
    data.append('password' , values.password);
    data.append('password_confirmation' , values.passwordConfirmation);
    data.append('token' , `${token}`);
    data.append('email' , `${email}`);
       mutate(data);
  };

  const validations = yup.object().shape({
    password: yup
      .string()
      .required("Password is required"),
      passwordConfirmation: yup.string()
      .required("Email is required"),
  });
  if(isSuccess){
    navigate('/login');
  }
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
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "lg",
        borderRadius: "md",
      }}
    >
        <Heading textAlign={'center'}>Request a Password Reset Email</Heading>
      <Formik
        initialValues={{ password : "" , passwordConfirmation : ""}}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <Form>
          {error && <Text color="red.700">{message?.email ? message?.email : ""}</Text>}
          {error && <Text color="red.700">{message?.password ? message?.password : ""}</Text>}
          {error && <Text color="red.700">{message?.password_confirmation ? message?.password_confirmation : ""}</Text>}
          <Box paddingTop={"50px"}>
            <FormControl id="password">
              <FormLabel fontFamily={"cursive"}>Password</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CgPassword color="black" />}
                />
                <Field
                  name="password"
                  as={Input}
                  type="password"
                  outlineColor="black"
                  placeholder="Password"
                  _placeholder={{ color: "gray.700" }}
                  borderRadius={"20"}
                  width={"full"}
                  pl={"30px"}
                />
              </InputGroup>
              <ErrorMessage name="password">
                {(msg) => <Text color="red.500">{msg}</Text>}
              </ErrorMessage>
            </FormControl>
            <FormControl id="passwordConfirmation">
              <FormLabel fontFamily={"cursive"}>password Confirmation</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CgPassword />}
                />
                <Field
                  name="passwordConfirmation"
                  as={Input}
                  type="password"
                  outlineColor="black"
                  placeholder="passwordConfirmation"
                  _placeholder={{ color: "gray.700" }}
                  borderRadius={"20"}
                  width={"full"}
                  pl={"30px"}
                />
              </InputGroup>
              <ErrorMessage name="passwordConfirmation">
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
              {isPending ? "Loading..." : "Reset Password"}
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
    </Box>
  );
}

export default ResetPasswordForm