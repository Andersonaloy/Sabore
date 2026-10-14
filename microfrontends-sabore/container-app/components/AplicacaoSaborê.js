import { lazy, Suspense } from 'react';
import styles from './AplicacaoSabore.module.css';

const Cardapio = lazy(() => import('cardapio/Cardapio'));
const Pedido = lazy(() => import('pedido/Pedido'));

function Carregando() {
  return <p className={styles.carregando}>Carregando conteúdo...</p>;
}

export default function AplicacaoSabore() {
  return (
    <main className={styles.pagina}>
      <header className={styles.cabecalho}>
        <a className={styles.logo} href="/">
          saborê<span>.</span>
        </a>

        <p>Comida boa, momentos melhores.</p>
      </header>

      <div className={styles.conteudo}>
        <section className={styles.areaCardapio}>
          <Suspense fallback={<Carregando />}>
            <Cardapio />
          </Suspense>
        </section>

        <aside className={styles.areaPedido}>
          <Suspense fallback={<Carregando />}>
            <Pedido />
          </Suspense>
        </aside>
      </div>

      <footer className={styles.rodape}>
        Saborê · Seu próximo prato favorito.
      </footer>
    </main>
  );
}