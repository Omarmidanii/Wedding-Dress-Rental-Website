import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaImage, FaUser } from "react-icons/fa";
import User from "../../entities/User";
import usePost from "../../hooks/usePost";
import useShowUser from "../../hooks/useShowUser";
import useErrorStore from "../../stores/errorStore";

const UserInfo = () => {
  const user = useShowUser();
  const { mutate, isPending, error, isSuccess } = usePost<User, FormData>(
    "users/update"
  );
  const [photo, setPhoto] = useState<File | null>(null);
  const { message : m } = useErrorStore();
  const handleSubmit = (values: User) => {
    const data = new FormData();
    if (values.name) data.append("name", values.name);
    if (photo) data.append("photo", photo);
    mutate(data);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h2" size="lg" textAlign="center">
        User Account
      </Heading>
      <Avatar size="xl" src={user.data?.data.photo} mx="auto" />
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={null}
      >
        <Form>
          {error && <Text color="red.700">{m?.photo[0]}</Text>}
          {isSuccess && <Text color="green">Updated Successfully</Text>}
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
            <FormControl id="photo" pb={"20px"}>
              <FormLabel fontFamily={"cursive"}>photo</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaImage color="black" />}
                />
                <Input
                  name="photo"
                  type="file"
                  p={1}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setPhoto(file);
                    }
                  }}
                  placeholder="User Photo"
                  outlineColor="black"
                  _placeholder={{ color: "gray.700" }}
                  borderRadius={"20"}
                  width={"full"}
                  pl={"30px"}
                />
              </InputGroup>
              <ErrorMessage name="photo">
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
              {isPending ? "Loading..." : "Update"}
            </Button>
          </Box>
        </Form>
      </Formik>
    </VStack>
  );
};

export default UserInfo;
