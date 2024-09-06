import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MdOutlineMail } from "react-icons/md";
import User from "../../entities/User";
import usePost from "../../hooks/usePost";
import * as yup from "yup";
import useErrorStore from "../../stores/errorStore";
import Background3 from "../../assets/Background2.jpg";
const EmailResetPassword = () => {
  const { mutate, error, isPending, isSuccess } = usePost<User, FormData>(
    "forgot-password"
  );
  const { message } = useErrorStore();
  const handleSubmit = (values: User) => {
    const data = new FormData();
    if (values.email) data.append("email", values.email);
    mutate(data);
  };

  const validations = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
  });

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
        <Heading textAlign={"center"}>Request a Password Reset Email</Heading>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={handleSubmit}
          validationSchema={validations}
        >
          <Form>
            {error && <Text color="red.700">{message?.email}</Text>}
            {isSuccess && <Text color="green">"Email sent Successfully</Text>}
            <Box paddingTop={"50px"}>
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
              <Button
                bgColor={"red.600"}
                color={"white"}
                width="full"
                type="submit"
                marginTop={5}
                borderRadius={"20"}
              >
                {isPending ? "Loading..." : "Submit"}
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default EmailResetPassword;
