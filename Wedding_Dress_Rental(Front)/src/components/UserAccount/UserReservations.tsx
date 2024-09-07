import { Box, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import Reservation from "../../entities/Reservation";
import useGetAll from "../../hooks/useGetAll";
import { Error } from "../Error";

export const UserReservations = () => {
    
    const {data : reservations , isPending , isError } = useGetAll<Reservation>('reservations');
  if(isError){
    return <Error message="an error occured with reservations" />
  }
  if(isPending){
    return <Spinner />
  }

  return (
    <Box mt={10}>
    <Heading as="h3" size="md" mb={4}>
      Reservations
    </Heading>
    {reservations.data.length === 0 && <Text textAlign={'center'}>There is No Resevations</Text>}
    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
      {reservations.data.map((reservation) => (
        <Box key={reservation.id} p={4} borderWidth={1} borderRadius="lg" boxShadow="md">
          <Text><strong>Reservation ID:</strong> {reservation.id}</Text>
          <Text><strong>Start Time:</strong> {reservation.start_time}</Text>
          <Text><strong>End Time:</strong> {reservation.end_time}</Text>
          <Text><strong>Price:</strong> {reservation.rental_price}</Text>
        </Box>
      ))}
    </SimpleGrid>
  </Box>
  )
}
