# ![AbleMail](static/logo-blue.png)
**Furthering independence through email:** AbleMail is a free-for-use email client web app that allows people with cognitive disabilities to independently use email.

See a more detailed project description [here](http://www.team1540.org/ablemail)!

Created and maintained by [Tristan Peng](https://www.github.com/theamazingness).

## Setup
1. Clone this repository:
<br>`git clone https://github.com/TheAmazingness/ablemail.git <your-project-folder>`
2. Run `yarn` on the folder to install all dependencies.
3. Run `yarn run dev` for the dev version.
4. Visit [`http://localhost:3000`](http://localhost:300).

This project was made with [Next.js](https://nextjs.org/), [Material UI](https://material-ui.com), [Express](http://expressjs.com), and [React](https://reactjs.org).

## Signing In With a Gmail Account
1. Visit [https://myaccount.google.com/](https://myaccount.google.com/).
2. Click on `Security`
3. Turn on `Less secure app access`
4. Go back to AbleMail
5. Sign in

## Usage
It is recommended to use Google Chrome to use AbleMail because AbleMail uses experimential Web APIs such as [`SpeechRecognition`](https://caniuse.com/#feat=speech-recognition) and [`SpeechSynthesis`](https://caniuse.com/#feat=speech-synthesis). To see what browsers to support these experimental technologies, click on the words to learn more.

## Next
This branch is for AbleMail with Next.js, React hooks, and independence from Gmail.
