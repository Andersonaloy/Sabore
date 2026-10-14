import Cardapio from '../components/Cardapio';

export default function Home() {
  return (
    <main style={{ maxWidth: 850, margin: '40px auto', padding: 20 }}>
      <h1 style={{ color: '#183b2b' }}>Saborê</h1>
      <Cardapio />
    </main>
  );
}