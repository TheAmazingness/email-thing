import style from './style';

const Head = () => {
  // TODO: favicon
  return (
    <>
      <title>AbleMail</title>
      <link rel="shortcut icon" href="../static/favicon.ico" />
      <style global="true">{ style }</style>
    </>
  );
};

export default Head;