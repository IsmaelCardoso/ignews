import { useSession, signIn } from "next-auth/client";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface ISubscribeButtonProps {
  priceId: string;
}

const SubscribeButton = ({ priceId }: ISubscribeButtonProps) => {
  const [session] = useSession();

  const handleSubscribe = async () => {
    if (!session) {
      signIn("github");

      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  );
};

export { SubscribeButton };
