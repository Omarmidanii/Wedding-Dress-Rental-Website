import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Layout/NavBar";
import Background3 from "../assets/Background2.jpg";
export const Layout = () => {
  return (
    <Grid
      templateAreas={`"nav"
        "main"`}
      overflow={"hidden"}
      bgImage={`url(${Background3})`}
      bgSize="cover"
      bgPosition="center"
      h={"100vh"}
    >
      <GridItem
        area={"nav"}
        position="sticky"
        top="0"
        zIndex="sticky"
        width="full"
      >
        <NavBar />
      </GridItem>
      <GridItem area={"main"} maxHeight={"100%"} overflowY={"auto"}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};
