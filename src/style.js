const FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize')) || false;
export const style = theme => ({
  // TODO: Keep sorting
  // Unsorted
  icon: {
    fontSize: FONT_SIZE ? '60pt' : '40pt'
  },
  iconButton: {
    margin: 'auto'
  },
  iconLarge: {
    fontSize: FONT_SIZE ? '90pt' : '60pt'
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
  subject: {
    fontSize: FONT_SIZE ? '60pt' : '40pt'
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  textLarge: {
    fontSize: FONT_SIZE ? '45pt' : '30pt'
  },
  title: {
    fontSize: FONT_SIZE ? '60pt' : '40pt'
  },
  verticalCenterFlex: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  verticalCenterGrid: {
    display: 'verticalCenterFlex'
  },

  // Mail.js
  cannedBtn: {
    display: 'inline-block',
    padding: `0 ${ theme.spacing.unit }px`
  },
  mailBody: {
    height: '100%',
    padding: theme.spacing.unit * 10,
    width: '100%'
  },
  pre: {
    fontFamily: 'Roboto',
    fontSize: FONT_SIZE ? '45pt' : '30pt'
  },
  quickReply: {
    alignItems: 'flex-start',
    display: 'flex'
  },

  // MailHeader.js
  from: {
    fontSize: FONT_SIZE ? '30pt' : '20pt'
  },
  read: {
    padding: theme.spacing.unit * 5
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
  toolbar: theme.mixins.toolbar,

  // MailPreview.js
  from: {
    fontSize: FONT_SIZE ? '45pt' : '30pt'
  },
  email: {
    fontSize: FONT_SIZE ? '0pt' : '12pt'
  },
  gridIcon: {
    display: 'verticalCenterFlex',
    textAlign: 'center'
  },
  open: {
    fontSize: FONT_SIZE ? '45pt' : '30pt'
  },
  openIcon: {
    fontSize: FONT_SIZE ? '60pt' : '40pt'
  },
  padding: {
    padding: theme.spacing.unit * 5
  },
  snippet: {
    fontSize: FONT_SIZE ? '36pt' : '24pt'
  },

  // SideNav
  drawer: {
    flexShrink: 0,
    width: FONT_SIZE ? 450 : 400
  },
  drawerPaper: {
    width: FONT_SIZE ? 450 : 400
  },
  fontSize: {
    fontSize: FONT_SIZE ? '60pt' : '40pt',
    fontWeight: FONT_SIZE ? 'bold' : ''
  },
  separator: theme.mixins.toolbar,

  // TopNav.js
  toolbar: {
    width: '90%'
  },

  // SettingsBody.js
  canned: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  // Canned.js
  cannedTitle: {
    fontSize: FONT_SIZE ? '36pt' : '24pt'
  },
  message: {
    width: '100%'
  },

  // FontSize.js, HelpEmail.js
  label: {
    fontSize: FONT_SIZE ? '36pt' : '24pt'
  },





















  // Sorted
  appBar: {
    alignItems: 'center',
    zIndex: 1400
  },
  body: {
    height: '100%',
    padding: theme.spacing.unit * 10,
    width: '100%'
  },
  button: {
    fontSize: FONT_SIZE ? '24pt' : '16pt',
    padding: theme.spacing.unit
  },
  close: {
    display: 'grid'
  },
  dialog: {
    padding: theme.spacing.unit * 10,
    zIndex: 2000
  },
});