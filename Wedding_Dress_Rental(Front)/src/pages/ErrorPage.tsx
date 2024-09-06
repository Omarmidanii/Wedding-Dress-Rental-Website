import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/Layout/NavBar";

interface Props {
  message?: string;
}

export const ErrorPage = ({ message }: Props) => {
  const error = useRouteError();
  return (
    <Grid templateAreas={`"nav" "main"`}>
      <GridItem area={"nav"}>
        <NavBar />
      </GridItem>
      <GridItem area={"main"} textAlign={'center'}>
        <Box padding={5}>
          <Heading p={5}>Oops</Heading>
          <Text>
            {isRouteErrorResponse(error) ? "Ohh What an intersting discovery!!! You Found A Page That Not Even Exist ;) , You can go back now" : message}
          </Text>
        </Box>
      </GridItem>
    </Grid>
  );
};
