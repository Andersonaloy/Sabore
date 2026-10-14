import Head from 'next/head';
import Pedido from '../components/Pedido';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Saborê | Seu Pedido</title>
        <meta
          name="description"
          content="Confira os pratos escolhidos no Saborê."
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <a href="/" className={styles.logo}>
              saborê<span>.</span>
            </a>

            <span className={styles.status}>
              SEU RESTAURANTE DIGITAL
            </span>
          </header>

          <Pedido />

          <footer className={styles.footer}>
            Feito com carinho pelo Saborê.
          </footer>
        </div>
      </main>
    </>
  );
}