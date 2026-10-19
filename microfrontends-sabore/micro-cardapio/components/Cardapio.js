
import styles from './Cardapio.module.css';

const pratos = [
  {
    id: 'burger',
    nome: 'Burger da Casa',
    descricao: 'Hambúrguer artesanal, queijo e molho especial.',
    preco: 29.9,
    imagem:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85',
    alt: 'Hambúrguer artesanal com queijo, alface e tomate',
  },
  {
    id: 'pasta',
    nome: 'Pasta Cremosa',
    descricao: 'Massa ao molho cremoso com ervas frescas.',
    preco: 34.9,
    imagem:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=85',
    alt: 'Prato de massa com molho e ervas frescas',
  },
  {
    id: 'salad',
    nome: 'Salada Tropical',
    descricao: 'Folhas frescas, frutas e molho cítrico.',
    preco: 22.9,
    imagem:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85',
    alt: 'Salada fresca com vegetais coloridos',
  },
  {
    id: 'brownie',
    nome: 'Brownie de Chocolate',
    descricao: 'Brownie macio com chocolate intenso.',
    preco: 14.9,
    imagem:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=85',
    alt: 'Brownie de chocolate servido como sobremesa',
  },
];

export default function Cardapio() {
  function adicionarAoPedido(prato) {
    window.dispatchEvent(
      new CustomEvent('sabore:adicionar-item', {
        detail: {
          id: prato.id,
          nome: prato.nome,
          descricao: prato.descricao,
          preco: prato.preco,
        },
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
            <img
              className={styles.icone}
              src={prato.imagem}
              alt={prato.alt}
              loading="lazy"
            />

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
              type="button"
              className={styles.botao}
              onClick={() => adicionarAoPedido(prato)}
              aria-label={`Adicionar ${prato.nome} ao pedido`}
            >
              + Adicionar
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
