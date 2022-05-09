import React from "react";
import {Heading, Text, SimpleGrid, Box} from "@chakra-ui/react";
import Link from "next/link";

const Regions = ({ areas }) => {
 console.log(areas);
    return (
        <SimpleGrid columns={4} spacing="50px">
            {areas.map((area) => {
                return (
                    <Link href={`/regions/${area.id}`}>
                    <Box alignItems='flex-start' key={area.id}>
                        <Heading as="h4"  size="md">{area.title}</Heading>
                        <Text >Population: {area.population}</Text>
                        <Text >Square: {area.square}</Text>
                    </Box>
                    </Link>
                );
            })}
        </SimpleGrid>
    );
};

export default Regions;
