import styles from './Cardapio.module.css';

const pratos = [
  {
    id: 'burger',
    nome: 'Burger da Casa',
    descricao: 'Hambúrguer artesanal, queijo e molho especial.',
    preco: 29.9,
  },
  {
    id: 'pasta',
    nome: 'Pasta Cremosa',
    descricao: 'Massa ao molho cremoso com ervas frescas.',
    preco: 34.9,
  },
  {
    id: 'salad',
    nome: 'Salada Tropical',
    descricao: 'Folhas frescas, frutas e molho cítrico.',
    preco: 22.9,
  },
  {
    id: 'brownie',
    nome: 'Brownie de Chocolate',
    descricao: 'Brownie macio com chocolate intenso.',
    preco: 14.9,
  },
];

export default function Cardapio() {
  function adicionarAoPedido(prato) {
    window.dispatchEvent(
      new CustomEvent('sabore:adicionar-item', {
        detail: prato,
      })
    );
  }

  return (
    <section className={styles.cardapio}>
      <header className={styles.cabecalho}>
        <span className={styles.etiqueta}>NOSSO MENU</span>
        <h2>Feito para dar água na boca.</h2>
        <p>Escolha seus favoritos e monte seu pedido.</p>
      </header>

      <div className={styles.lista}>
        {pratos.map((prato) => (
          <article className={styles.prato} key={prato.id}>
            <div className={styles.icone}>
              {{
                burger: '🍔',
                pasta: '🍝',
                salad: '🥗',
                brownie: '🍫',
              }[prato.id]}
            </div>

            <div className={styles.info}>
              <h3>{prato.nome}</h3>
              <p>{prato.descricao}</p>
              <strong>
                {prato.preco.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </strong>
            </div>

            <button
              className={styles.botao}
              onClick={() => adicionarAoPedido(prato)}
            >
              + Adicionar
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}