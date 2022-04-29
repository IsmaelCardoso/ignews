import { Client } from "faunadb";

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY,
  domain: "db.us.fauna.com",
});

/**
 * As operações feitas com este tipo de DB só pode ser feita por:
 * pages/api
 * GetStaticProps
 * GetServerSideProps
 */
