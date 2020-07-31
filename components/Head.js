import Head from 'next/head';

const CustomHead = props => {
  return (
    <Head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="shortcut icon" href="../static/favicon.ico" />
      <link rel="stylesheet" href="../static/style.css" />
      <title>AbleMail{ props.children && ` | ${ props.children }` }</title>
    </Head>
  );
};

export default CustomHead;