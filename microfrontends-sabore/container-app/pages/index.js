import Head from 'next/head';
import AplicacaoSabore from '../components/AplicacaoSaborê';

export default function Home() {
  return (
    <>
      <Head>
        <title>Saborê | Restaurante Digital</title>
        <meta
          name="description"
          content="Monte seu pedido com os pratos do Saborê."
        />
      </Head>

      <AplicacaoSabore />
    </>
  );
}