
import { fireEvent, render, screen, act } from '@testing-library/react';
import Pedido from '../components/Pedido';

describe('Carrinho do Saborê', () => {
  test('mostra uma mensagem quando o carrinho está vazio', () => {
    render(<Pedido />);

    expect(
      screen.getByText('Seu pedido ainda está vazio.')
    ).toBeInTheDocument();
  });

  test('recebe um prato pelo evento do cardápio', () => {
    render(<Pedido />);

    act(() => {
      window.dispatchEvent(
        new CustomEvent('sabore:adicionar-item', {
          detail: {
            id: 'burger',
            nome: 'Burger da Casa',
            preco: 29.9,
          },
        })
      );
    });

    expect(screen.getByText('Burger da Casa')).toBeInTheDocument();
    expect(screen.getAllByText('R$ 29,90')).toHaveLength(2);
  });

  test('agrupa duas unidades do mesmo prato e calcula o total', () => {
    render(<Pedido />);

    const burger = {
      id: 'burger',
      nome: 'Burger da Casa',
      preco: 29.9,
    };

    act(() => {
      window.dispatchEvent(
        new CustomEvent('sabore:adicionar-item', { detail: burger })
      );
      window.dispatchEvent(
        new CustomEvent('sabore:adicionar-item', { detail: burger })
      );
    });

    expect(screen.getByText('2 × R$ 29,90')).toBeInTheDocument();
    expect(screen.getAllByText('R$ 59,80')).toHaveLength(2);
    expect(screen.getByText('2 itens selecionados')).toBeInTheDocument();
  });

  test('remove uma unidade do prato ao clicar no botão de remoção', () => {
    render(<Pedido />);

    act(() => {
      window.dispatchEvent(
        new CustomEvent('sabore:adicionar-item', {
          detail: {
            id: 'brownie',
            nome: 'Brownie de Chocolate',
            preco: 14.9,
          },
        })
      );
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Remover uma unidade de Brownie de Chocolate',
      })
    );

    expect(
      screen.getByText('Seu pedido ainda está vazio.')
    ).toBeInTheDocument();
  });

  test('abre o formulário ao clicar em Finalizar pedido', () => {
    render(<Pedido />);

    act(() => {
      window.dispatchEvent(
        new CustomEvent('sabore:adicionar-item', {
          detail: {
            id: 'burger',
            nome: 'Burger da Casa',
            preco: 29.9,
          },
        })
      );
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Finalizar pedido' })
    );

    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Telefone')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Confirmar pedido' })
    ).toBeInTheDocument();
  });

  test('confirma o pedido e apresenta o total correto', () => {
    render(<Pedido />);

    act(() => {
      window.dispatchEvent(
        new CustomEvent('sabore:adicionar-item', {
          detail: {
            id: 'burger',
            nome: 'Burger da Casa',
            preco: 29.9,
          },
        })
      );
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Finalizar pedido' })
    );

    fireEvent.change(screen.getByLabelText('Nome completo'), {
      target: { value: 'Cliente Teste' },
    });

    fireEvent.change(screen.getByLabelText('Telefone'), {
      target: { value: '51999999999' },
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Confirmar pedido' })
    );

    expect(screen.getByText('Pedido confirmado!')).toBeInTheDocument();
    expect(
      screen.getByText(/Obrigado, Cliente Teste!/)
    ).toBeInTheDocument();
    expect(screen.getByText(/SAB-/)).toBeInTheDocument();
    expect(screen.getByText('R$ 29,90')).toBeInTheDocument();
  });
});
