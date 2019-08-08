import Link from 'next/link';
import CustomHead from '../components/Head';

const Index = () => {
  return (
    <div className="app">
      <CustomHead />
      <h1>Temporary Landing Page</h1>
      <Link href="/app">
        <a>AbleMail</a>
      </Link>
    </div>
  );
};

export default Index;