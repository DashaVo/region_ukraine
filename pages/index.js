import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Regions from "../components/regions";
import fetch from "fetch";


export default function Home({areas}) {
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
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
