import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Reservation from "../../entities/Reservation";
import usePost from "../../hooks/usePost";
import useErrorStore from "../../stores/errorStore";

interface Props {
  id: number;
}
const ReservationForm = ({ id }: Props) => {
  const StoreReservation = usePost<Reservation, FormData>("reservations");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {message} = useErrorStore();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      if (endDate < startDate) {
        setError("End date cannot be before start date.");
        return;
      }
      const formattedStartDate = format(startDate, "yyyy-MM-dd HH:mm:ss");
      const formattedEndDate = format(endDate, "yyyy-MM-dd HH:mm:ss");
      const data = new FormData();
      data.append("start_time", formattedStartDate);
      data.append("end_time", formattedEndDate);
      data.append("wedding_dress_id", `${id}`);
      setError(null);
      StoreReservation.mutate(data);
    }
  };
  return (
    <HStack as="form" spacing={4} onSubmit={handleSubmit} pl={16}>
      <VStack w={"350px"}>
        <Text textColor={"green"}>
          {StoreReservation.isSuccess ? "Reserved Successfully" : ""}
        </Text>
        <Text textColor={"red"}>
          {StoreReservation.isError
            ? message?.end_time
            : ""}
        </Text>
        <FormControl mb={4}>
          <FormLabel>Start Date</FormLabel>
          <InputGroup>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm:ss"
              placeholderText="start time"
              customInput={
                <Input
                  outlineColor="blue"
                  padding={["8px", "12px", "16px", "20px"]}
                  fontSize={["sm", "md", "lg", "xl"]}
                />
              }
            />
          </InputGroup>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>End Date</FormLabel>
          <InputGroup>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm:ss"
              placeholderText="end time"
              customInput={
                <Input
                  outlineColor="blue"
                  padding={["8px", "12px", "16px", "20px"]}
                  fontSize={["sm", "md", "lg", "xl"]}
                />
              }
              minDate={startDate ? startDate : undefined}
            />
          </InputGroup>
        </FormControl>
      </VStack>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Button type="submit" colorScheme="blue">
        {StoreReservation.isPending ? "Loading" : "Reserve"}
      </Button>
    </HStack>
  );
};

export default ReservationForm;
