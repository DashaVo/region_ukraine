import Layout, {siteTitle} from '/components/Layout';
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import Image from 'next/image'
import Head from "next/head";

const client = new ApolloClient({
    uri: "https://decentralization.gov.ua/graphql/",
    cache: new InMemoryCache(),
});

export default function Region({ area }) {
    const path = `/../public/images/regions/${area.id}/map.png`
    return <Layout >
        <Head>
            <title>{area.title}</title>
        </Head>
        <Image
            src={path}
            height={344}
            width={544}
            alt="area_map"/>
        <div>
            <h1>{area.title}</h1>
            <h2>Площа: {area.square} м²</h2>
            <h2>Кількість населення: {area.population}</h2>
            <h2>К-ть територіальних громад: {area.local_community_count}</h2>
            <h2>Відсоток громад по області: {area.percent_communities_from_area}</h2>
            <h2>Площа об'єднаних громад: {area.sum_communities_square} м²</h2>
        </div>

    </Layout>;
}

export async function getStaticPaths() {

    const { data } = await client.query({
        query: gql`
        query {
          areas
          {
          id
          }
      }
    `,
    });
    console.log(data.areas.id);
    const paths = data.areas.map(({id}) =>{ return {
            params: {
                id: `${id}`,
            },
        };}
    );

    return {
        paths,
        fallback: false,
    };

}

export async function getStaticProps({ params }) {

    const { data } = await client.query({
        query: gql`
        query{
          area(id: "${params.id}")
          {
          title
          id
          square
          population
          local_community_count
          percent_communities_from_area
          sum_communities_square
          }
      }
      `,variables:{id: params.id}
    });
    return {
        props: {
            area: data.area,
        },
    };
}
