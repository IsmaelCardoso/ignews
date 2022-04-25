import styles from "./styles.module.scss";

interface ISubscribeButtonProps {
  priceId: string;
}

const SubscribeButton = ({ priceId }: ISubscribeButtonProps) => {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
};

export { SubscribeButton };
