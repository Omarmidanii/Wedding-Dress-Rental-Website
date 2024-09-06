import { Button, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import weddingDresses from "../../entities/Wedding_Dress";
import useGetPaginated from "../../hooks/useGetPaginated";
import { Error } from "../Error";
import { CardSkeleton } from "../Skeleton/CardSkeleton";
import WeddingDressCard from "./WeddingDressCard";

const WeddingDressGrid = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPaginated<weddingDresses>("wedding_dresses");
  if (error) return <Error message={error.message} />;
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  console.log(!!hasNextPage);
  return (
    <>
      <SimpleGrid
        spacing={6}
        columns={{ sm: 1, md: 3, lg: 4 }}
        padding={"30px"}
      >
        {isLoading &&
          skeleton.map((s) => <CardSkeleton key={s}></CardSkeleton>)}
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.map((wedding_dress) => (
              <WeddingDressCard
                key={wedding_dress.id}
                wedding_dress={wedding_dress}
              ></WeddingDressCard>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
      <Button
        colorScheme="blue"
        onClick={() => fetchNextPage()}
        isDisabled={!!hasNextPage ? false : true}
        isLoading={isFetchingNextPage}
      >
        {!!hasNextPage ? "Loadmore" : "no more dresses"}
      </Button>
    </>
  );
};

export default WeddingDressGrid;
