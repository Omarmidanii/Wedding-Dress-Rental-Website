import { Box, Heading, Icon, Image, Spinner, Text } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import {
  AiOutlineDollar,
  AiOutlineEllipsis,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { CgSize } from "react-icons/cg";
import weddingDresses from "../../entities/Wedding_Dress";
import useGetOne from "../../hooks/useGetOne";
import { Error } from "../Error";
import ReservationForm from "./ReservationForm";

const WeddingDressInfo = () => {
  const id = localStorage.getItem("dressId");
  const {
    data: dress,
    status,
    isError,
  } = useGetOne<weddingDresses>(Number(id), "wedding_dresses");

  const isLoading = status === "pending";
  if (isError) {
    return <Error message={"an error occured"} />;
  }
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <Box display="flex" p={4} overflow={"hidden"}>
      <Box flex="1" mr={4}>
        <Heading as="h2" size="lg" mb={4}>
          <Icon as={AiOutlineEllipsis} mr={1} mt={1} /> {dress?.data.name}
        </Heading>
        <Text mb={2}>
          <Icon as={AiOutlineInfoCircle} mr={1} mt={1} />
          <strong>Description:</strong> {dress?.data.description}
        </Text>
        <Text mb={2}>
          <Icon as={CgSize} mr={1} mt={1} />
          <strong>Size:</strong> {dress?.data.size}
        </Text>
        <Text mb={2}>
          <Icon as={AiOutlineDollar} mr={1} mt={1} />
          <strong>Rental Price:</strong> ${dress?.data.rental_price}
        </Text>
      </Box>
      <Box
        flex="1"
        textAlign="center"
        maxH={"565px"}
        overflowY={"auto"}
        outlineColor={"red"}
      >
        <Image src={`${dress?.data.photo}`} alt={dress?.data.name} mb={4} />
        <ReservationForm id={dress.data.id} />
      </Box>
    </Box>
  );
};

export default WeddingDressInfo;
