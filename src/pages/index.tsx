import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "./home.module.scss";

interface IProduct {
  priceId: string;
  amount: number;
}
interface IHomeProps {
  product: IProduct;
}

const Home = ({ product }: IHomeProps) => {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about <br />
            the <span>React</span> world.
          </h1>
          <p>
            Get access to all publications
            <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="./images/avatar.svg" alt="Girls coding" />
      </main>
    </>
  );
};
/*
 * Requests:
 * Client-side (traditional)
 * Server-side SSR - GetServerSideProps
 * Static side SSG - getStaticProps (+ revalidate)
 *
 * Ex:
 * Blog post -> SSG
 * Blog comment -> Client-side
 **/

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1KsUrDBiYgsIPADWl6yDXdm7", {
    expand: ["product"],
  });

  const product = {
    priceId: price?.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price?.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 hours
  };
};

export default Home;
