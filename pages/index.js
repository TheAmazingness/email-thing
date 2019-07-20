import Link from 'next/link';
import CustomHead from '../components/Head';

const Index = () => {
  return (
    <div className="app">
      <CustomHead />
      <Link href="/app">
        <a>yeetus</a>
      </Link>
    </div>
  );
};

export default Index;