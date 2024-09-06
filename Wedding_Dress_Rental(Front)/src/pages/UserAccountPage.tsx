import { Box } from "@chakra-ui/react";
import UserInfo from "../components/UserAccount/UserInfo";
import { UserReservations } from "../components/UserAccount/UserReservations";

export const UserAccountPage = () => {
  
   
    return (
        <Box maxW="800px" mx="auto" p={5} borderWidth={1} borderRadius="lg" boxShadow="lg">
         <UserInfo />
         <UserReservations />
         </Box>
    );
}
