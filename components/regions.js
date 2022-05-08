import React from "react";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";

const Regions = ({ areas }) => {
    return (
        <SimpleGrid columns={[1, 2, 3,4]} spacing="50px">
            {areas.map((area) => {
                return (
                    <div key={area.id}>
                        <Heading as="h4" align="center" size="md">
                            <Link href={`/regions/${area.id}`}>
                                <a>{area.title}</a>
                            </Link>
                        </Heading>
                        <Text align="center">Population: {area.population}</Text>
                        <Text align="center">Square: {area.square}</Text>
                    </div>
                );
            })}
        </SimpleGrid>
    );
};

export default Regions;
