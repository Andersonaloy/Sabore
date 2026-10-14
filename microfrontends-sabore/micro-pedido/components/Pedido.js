import { useEffect, useState } from 'react';
import styles from './Pedido.module.css';

export default function Pedido() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    function receberItem(event) {
      const prato = event.detail;

      setItens((itensAtuais) => {
        const itemExistente = itensAtuais.find(
          (item) => item.id === prato.id
        );

        if (itemExistente) {
          return itensAtuais.map((item) =>
            item.id === prato.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          );
        }

        return [...itensAtuais, { ...prato, quantidade: 1 }];
      });
    }

    window.addEventListener('sabore:adicionar-item', receberItem);

    return () => {
      window.removeEventListener('sabore:adicionar-item', receberItem);
    };
  }, []);

  const quantidadeTotal = itens.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const valorTotal = itens.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  function removerItem(id) {
    setItens((itensAtuais) =>
      itensAtuais
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  return (
    <section className={styles.pedido}>
      <header className={styles.cabecalho}>
        <span className={styles.etiqueta}>SEU PEDIDO</span>
        <h2>Uma delícia de escolha.</h2>
        <p>
          {quantidadeTotal === 0
            ? 'Seu pedido ainda está vazio.'
            : `${quantidadeTotal} ${quantidadeTotal === 1 ? 'item selecionado' : 'itens selecionados'}`}
        </p>
      </header>

      {itens.length === 0 ? (
        <div className={styles.vazio}>
          <span className={styles.iconeVazio}>🛍️</span>
          <h3>Que tal escolher algo?</h3>
          <p>Adicione pratos do cardápio para vê-los aqui.</p>
        </div>
      ) : (
        <>
          <div className={styles.lista}>
            {itens.map((item) => (
              <article className={styles.item} key={item.id}>
                <div className={styles.info}>
                  <h3>{item.nome}</h3>
                  <p>
                    {item.quantidade} ×{' '}
                    {item.preco.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </div>

                <button
                  className={styles.remover}
                  onClick={() => removerItem(item.id)}
                  aria-label={`Remover uma unidade de ${item.nome}`}
                >
                  −
                </button>

                <strong className={styles.subtotal}>
                  {(item.preco * item.quantidade).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </strong>
              </article>
            ))}
          </div>

          <footer className={styles.resumo}>
            <span>Total do pedido</span>
            <strong>
              {valorTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </strong>
          </footer>
        </>
      )}
    </section>
  );
}