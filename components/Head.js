import Head from 'next/head';

const CustomHead = () => {
  return (
    <Head>
      <title>AbleMail</title>
      <link rel="shortcut icon" href="../static/favicon.ico" />
      <link rel="stylesheet" href="../static/style.css" />
    </Head>
  );
};

export default CustomHead;