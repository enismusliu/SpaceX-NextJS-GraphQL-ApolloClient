import styles from '../styles/Home.module.css'
import {ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from 'next/link'

export default function Home({ launches }) {
  console.log("Launches:",launches)
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          SpaceX 
        </h1>
        <p className={styles.description}>
          Launches from SpaceX
        </p>

        <div className={styles.grid}>
          {launches.map (launch=>{
            return (
              <div className={styles.card}>
              <a href={launch.links.video_link} key={launch.id}>
                 <img src={launch.links.flickr_images}
                  style={{ width: "200px", height: "200px" }}
                    alt={launch.mission_name}
                  className={styles.photo}/>    
              </a>
                   <p><strong>Mission Name: </strong><br />{launch.mission_name}</p>
                   <p><strong>Rocet Name: </strong><br />{launch.rocket.rocket_name}</p>
                   <p><strong>Launch Time: </strong><br />{launch.launch_date_local}</p>
                <br />
                <a href={launch.links.article_link} className={styles.buton}>Read more...</a>
                </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
export async function getStaticProps() {
  const client = new ApolloClient({
    uri:'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  })
  const { data }= await client.query({
    query: gql`
    query getLaunches{
      launchesPast(limit:12) {
         mission_name
         launch_date_local
          links {
                 article_link
                 flickr_images
                 video_link
                }
          rocket {
                 rocket_name
                 rocket_type
                 }
          mission_id
          id
  }
}
    `
  })
  
  return {
    props: {
      launches: data.launchesPast
   }
 }
}
