const FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize')) || false;
export const style = theme => ({
  // TODO: Make everything work
  // Global
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
    zIndex: 2000
  },
  dialogBody: {
    height: '100%',
    padding: theme.spacing.unit * 10,
    width: '100%'
  },
  displayGrid: {
    display: 'grid'
  },
  marginAuto: {
    margin: 'auto'
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

  // TopNav.js
  appBar: {
    alignItems: 'center',
    zIndex: 1400
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
  width90: {
    width: '90%'
  },

  // SideNav.js
  drawer: {
    flexShrink: 0,
    width: FONT_SIZE ? 450 : 400
  },
  drawerPaper: {
    width: FONT_SIZE ? 450 : 400
  },

  // MailPreview.js
  email: {
    fontSize: FONT_SIZE ? '0pt' : '12pt'
  },
  padding: {
    padding: theme.spacing.unit * 5
  },
  snippet: {
    fontSize: FONT_SIZE ? '36pt' : '24pt'
  },

  // Mail.js
  pre: {
    fontFamily: 'Roboto'
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
  }
});