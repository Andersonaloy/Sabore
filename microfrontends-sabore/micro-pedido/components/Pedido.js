
import { useEffect, useState } from 'react';
import styles from './Pedido.module.css';

export default function Pedido() {
  const [itens, setItens] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);
  const [cliente, setCliente] = useState({
    nome: '',
    telefone: '',
    entrega: 'retirada',
    endereco: '',
  });

  useEffect(() => {
    function receberItem(event) {
      const prato = event.detail;

      setPedidoConfirmado(null);

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

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function removerItem(id) {
    setPedidoConfirmado(null);

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

  function atualizarCliente(event) {
    const { name, value } = event.target;

    setCliente((clienteAtual) => ({
      ...clienteAtual,
      [name]: value,
    }));
  }

  function finalizarPedido(event) {
    event.preventDefault();

    const pedido = {
      numero: `SAB-${Date.now().toString().slice(-6)}`,
      cliente: { ...cliente },
      itens: itens.map((item) => ({ ...item })),
      quantidade: quantidadeTotal,
      total: valorTotal,
      criadoEm: new Date().toLocaleString('pt-BR'),
    };

    setPedidoConfirmado(pedido);
    setItens([]);
    setMostrarFormulario(false);
  }

  function novoPedido() {
    setPedidoConfirmado(null);
    setCliente({
      nome: '',
      telefone: '',
      entrega: 'retirada',
      endereco: '',
    });
  }

  if (pedidoConfirmado) {
    return (
      <section className={styles.pedido}>
        <div className={styles.vazio}>
          <span className={styles.iconeVazio}>✓</span>
          <h2>Pedido confirmado!</h2>
          <p>
            Obrigado, {pedidoConfirmado.cliente.nome}! Seu pedido foi
            registrado nesta sessão.
          </p>

          <div className={styles.confirmacao}>
            <p>
              <strong>Número:</strong> {pedidoConfirmado.numero}
            </p>
            <p>
              <strong>Itens:</strong> {pedidoConfirmado.quantidade}
            </p>
            <p>
              <strong>Total:</strong> {formatarMoeda(pedidoConfirmado.total)}
            </p>
            <p>
              <strong>Recebimento:</strong>{' '}
              {pedidoConfirmado.cliente.entrega === 'retirada'
                ? 'Retirada no local'
                : 'Entrega'}
            </p>
          </div>

          <button
            type="button"
            className={styles.botaoFinalizar}
            onClick={novoPedido}
          >
            Fazer novo pedido
          </button>
        </div>
      </section>
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
            : `${quantidadeTotal} ${
                quantidadeTotal === 1
                  ? 'item selecionado'
                  : 'itens selecionados'
              }`}
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
                    {item.quantidade} × {formatarMoeda(item.preco)}
                  </p>
                </div>

                <button
                  type="button"
                  className={styles.remover}
                  onClick={() => removerItem(item.id)}
                  aria-label={`Remover uma unidade de ${item.nome}`}
                >
                  −
                </button>

                <strong className={styles.subtotal}>
                  {formatarMoeda(item.preco * item.quantidade)}
                </strong>
              </article>
            ))}
          </div>

          <footer className={styles.resumo}>
            <span>Total do pedido</span>
            <strong>{formatarMoeda(valorTotal)}</strong>
          </footer>

          {!mostrarFormulario ? (
            <button
              type="button"
              className={styles.botaoFinalizar}
              onClick={() => setMostrarFormulario(true)}
            >
              Finalizar pedido
            </button>
          ) : (
            <form
              className={styles.formulario}
              onSubmit={finalizarPedido}
            >
              <h3>Seus dados</h3>
              <p>Preencha os dados para revisar e confirmar o pedido.</p>

              <label htmlFor="cliente-nome">Nome completo</label>
              <input
                id="cliente-nome"
                name="nome"
                type="text"
                autoComplete="name"
                value={cliente.nome}
                onChange={atualizarCliente}
                placeholder="Seu nome"
                required
              />

              <label htmlFor="cliente-telefone">Telefone</label>
              <input
                id="cliente-telefone"
                name="telefone"
                type="tel"
                autoComplete="tel"
                value={cliente.telefone}
                onChange={atualizarCliente}
                placeholder="(00) 00000-0000"
                required
              />

              <label htmlFor="cliente-entrega">Como deseja receber?</label>
              <select
                id="cliente-entrega"
                name="entrega"
                value={cliente.entrega}
                onChange={atualizarCliente}
              >
                <option value="retirada">Retirar no local</option>
                <option value="entrega">Receber em casa</option>
              </select>

              {cliente.entrega === 'entrega' && (
                <>
                  <label htmlFor="cliente-endereco">Endereço de entrega</label>
                  <textarea
                    id="cliente-endereco"
                    name="endereco"
                    value={cliente.endereco}
                    onChange={atualizarCliente}
                    placeholder="Rua, número, bairro e complemento"
                    rows={3}
                    required
                  />
                </>
              )}

              <div className={styles.resumoFormulario}>
                <span>{quantidadeTotal} item(ns)</span>
                <strong>{formatarMoeda(valorTotal)}</strong>
              </div>

              <button type="submit" className={styles.botaoFinalizar}>
                Confirmar pedido
              </button>

              <button
                type="button"
                className={styles.botaoVoltar}
                onClick={() => setMostrarFormulario(false)}
              >
                Voltar ao carrinho
              </button>
            </form>
          )}
        </>
      )}
    </section>
  );
}
