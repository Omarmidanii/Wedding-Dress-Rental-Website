import { Button, Card, CardBody, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import weddingDresses from "../../entities/Wedding_Dress";

interface Props {
  wedding_dress: weddingDresses;
}

const WeddingDressCard = ({ wedding_dress }: Props) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    localStorage.setItem("dressId", `${wedding_dress.id}`);
    navigate("/weddingDress/info");
  };
  return (
    <Card
      borderRadius={30}
      overflow={"hidden"}
      size="sm"
      position={"relative"}
      _hover={{
        transform: "scale(1.05)",
        transition: "transform .15s ease-in",
      }}
      onClick={handleCardClick}
      bg={'none'}
      boxShadow={'lg'}
    >
      <CardBody >
        <Image
          src={`${wedding_dress.photo}`}
          alt={"wedding dress Photo"}
          borderRadius={"10%"}
          boxSize={{sm: "600px" , md:"320px"}}
          fallbackSrc="https://via.placeholder.com/250"
        />
        <HStack justifyContent={'space-between'} p={2}>
        <VStack >
          <Text >
           <Text textAlign={'center'}> <strong>{wedding_dress.name}</strong></Text>
          </Text>
          <Text>
            {" "}
            <Text textAlign={"center"} textColor={"green"}>
              ${wedding_dress.rental_price}
            </Text>
          </Text>
        </VStack>
        <Button colorScheme="blue">View Datail</Button>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default WeddingDressCard;
