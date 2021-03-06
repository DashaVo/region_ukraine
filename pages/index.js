import Head from 'next/head';
import Layout, { siteTitle } from '/components/Layout';
import utilStyles from '/styles/utils.module.css';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Regions from "/components/regions";
import fetch from "fetch";
import Image from "next/image";
import nature from '/public/images/nature.jpg'
import orgnature from '/public/images/orgnature.jpg'
import {Flex, Box, Heading} from "@chakra-ui/react";
import { FaUsers, FaMoneyBill, FaLanguage,FaMapMarkerAlt, FaRegHeart } from "react-icons/fa";

export default function Home({areas}) {
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
          <Image
              src="https://raw.githubusercontent.com/link-u/avif-sample-images/master/kimono.avif"
              height={344}
              width={544}
              alt="area_map"/>
          <Box>original jpg</Box>
          <Image
              src="https://raw.githubusercontent.com/DashaVo/region_ukraine/main/public/images/orgnature.jpg"
              height={804}
              width={1920}
              alt="area_map"/>
          <Box>Mozpeg jpg</Box>
          <Image
              src={nature}
              height={804}
              width={1920}
              alt="area_map"/>
          <Flex justify="space-evenly" align="center" m='3em'>
              <Box align='center' bg='lightsteelblue' borderRadius="0.2em" h='8em' w='10em' p='1em' color='white' fontSize='xl'>
                  <FaUsers /><br/>
                  Населення:<br/> 47 732 079
              </Box>
              <Box align='center' bg='lightsteelblue' borderRadius="0.2em" h='8em' w='10em' p='1em' color='white' fontSize='xl'>
                  <FaMoneyBill/><br/>
                 Валюта:<br/> Гривня (UAH)
              </Box>
              <Box align='center' bg='lightsteelblue' borderRadius="0.2em" h='8em' w='10em' p='1em' color='white' fontSize='xl'>
                  <FaLanguage/><br/>
                  Офіційна мова:<br/> українська
              </Box>
              <Box align='center' bg='lightsteelblue' borderRadius="0.2em" h='8em' w='10em' p='1em' color='white' fontSize='xl'>
                  <FaMapMarkerAlt/><br/>
                  Столиця:<br/> Київ
              </Box>
              <Box align='center' bg='lightsteelblue' borderRadius="0.2em" h='8em' w='10em' p='1em' color='white' fontSize='xl'>
                  <FaRegHeart/><br/>
                  Набуття незалежності:<br/> 24 серпня, 1991
              </Box>

          </Flex>
          <Heading m='3em' align='center'>Області України</Heading>
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
              <Regions areas={areas}/>
          </section>
      </Layout>
  );
}
export async function getStaticProps() {
    const client = new ApolloClient({
        uri: "https://decentralization.gov.ua/graphql/",
        cache: new InMemoryCache(),
        fetch: fetch,
    });
    const regionid = "9";
        const { data } = await client.query({
            query: gql`
        query{
          areas
          {
          title
          id
          square
          population
          }
      }
    `,variables:{id: regionid}
        });

    return {
        props: {
            areas: data.areas,
        },
    };
}
