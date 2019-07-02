import Link from 'next/link';
import CustomHead from '../utils/head';

const Index = () => {
  return (
    <div className="app">
      <CustomHead />
      <Link href="/app">
        <a>yeetus</a>
      </Link>
      <br />
      <Link href="/mail">
        <a>testing</a>
      </Link>
    </div>
  );
};

export default Index;