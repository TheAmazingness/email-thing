import Head from 'next/head';
import style from './style';

const CustomHead = () => {
  return (
    <Head>
      <title>AbleMail</title>
      <link rel="shortcut icon" href="../static/favicon.ico" />
      <style global="true">{ style }</style>
    </Head>
  );
};

export default CustomHead;