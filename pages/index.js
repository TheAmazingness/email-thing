import Link from 'next/link';
import style from '../utils/style';

const Index = () => {
  return (
    <div className="app">
      <title>AbleMail</title>
      <Link href="/app">
        <button>yeetus</button>
      </Link>
      <style global="true">{ style }</style>
    </div>
  );
};

export default Index;