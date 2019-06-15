import Link from 'next/link';
import Head from '../utils/head';

const Index = () => {
  return (
    <div className="app">
      <Head />
      <Link href="/app">
        <button>yeetus</button>
      </Link>
    </div>
  );
};

export default Index;