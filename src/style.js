const FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize')) || false;
export const style = theme => ({
  // Global
  button: {
    fontSize: FONT_SIZE ? '24pt' : '16pt',
    padding: theme.spacing.unit
  },
  fontSize30_20: {
    fontSize: FONT_SIZE ? '30pt' : '20pt'
  },
  fontSize36_24: {
    fontSize: FONT_SIZE ? '36pt' : '24pt'
  },
  fontSize45_30: {
    fontSize: FONT_SIZE ? '45pt' : '30pt'
  },
  fontSize60_40: {
    fontSize: FONT_SIZE ? '60pt' : '40pt'
  },
  fontSize90_60: {
    fontSize: FONT_SIZE ? '90pt' : '60pt'
  },
  dialog: {
    padding: theme.spacing.unit * 10,
    zIndex: 1300
  },
  dialogBody: {
    height: '100%',
    padding: theme.spacing.unit * 10,
    width: '100%'
  },
  displayGrid: {
    display: 'grid'
  },
  height100: {
    height: '100%'
  },
  marginAuto: {
    margin: 'auto'
  },
  padding5: {
    padding: theme.spacing.unit * 5
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  toolbar: theme.mixins.toolbar,
  verticalCenterFlex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  width90: {
    width: '90%'
  },
  width100: {
    width: '100%'
  },

  // App.js
  content: {
    flexGrow: 1,
    marginLeft: FONT_SIZE ? 450 : 400,
    padding: theme.spacing.unit * 10,
    overflowY: 'scroll'
  },
  loading: {
    height: '100vh',
    lineHeight: '100vh',
    textAlign: 'center',
    width: '100vw'
  },


  // Compose.js
  select: {
    width: '100%'
  },

  // Mail.js
  pre: {
    fontFamily: 'Roboto'
  },

  // MailPreview.js
  email: {
    fontSize: FONT_SIZE ? '0pt' : '12pt'
  },
  hide: {
    display: 'none'
  },

  // QuickReply.js
  cannedBtn: {
    display: 'inline-block',
    padding: `0 ${ theme.spacing.unit }px`
  },
  quickReply: {
    alignItems: 'flex-start',
    display: 'flex'
  },

  // TopNav.js
  appBar: {
    alignItems: 'center',
    zIndex: 1299
  },
  login: {
    position: 'absolute',
    right: 0
  },
  logo: {
    height: '7.5vh',
    left: 0,
    margin: '0 auto',
    position: 'absolute',
    right: 0
  },
  settings: {
    left: 0,
    position: 'absolute'
  },

  // SideNav.js
  drawer: {
    flexShrink: 0,
    width: FONT_SIZE ? 450 : 400
  },
  drawerPaper: {
    width: FONT_SIZE ? 450 : 400
  }
});