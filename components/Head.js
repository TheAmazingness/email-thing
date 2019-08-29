import Head from 'next/head';

const CustomHead = props => {
  return (
    <Head>
      <title>AbleMail{ props.children && ` | ${ props.children }` }</title>
      <link rel="shortcut icon" href="../static/favicon.ico" />
      <link rel="stylesheet" href="../static/style.css" />
    </Head>
  );
};

export default CustomHead;