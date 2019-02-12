# ![AbleMail](public/logo-blue.png)
AbleMail SourceAmerica Project. Furthering independence through email.

Try it out [here](https://theamazingness.github.io/ablemail)!

See a more detailed project description [here](http://www.team1540.org/ablemail)!

Created and maintained by [Tristan Peng](https://www.github.com/theamazingness).

## Setup
1. Clone this repository:
<br>`git clone https://github.com/TheAmazingness/ablemail.git <your-project-folder>`
2. Don't forget to get an API key and an OAuth client ID.
<br>Create a file in `src/` called `credentials.json`, like this:
```json
{
  "localhost": {
    "CLIENT_ID": "xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
    "API_KEY": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```
3. `yarn` or `npm i`
4. `yarn start` or `npm start` to run the app in development mode. ([http://localhost:3000](http://localhost:3000) will automagically open in your favorite browser and reload with any edits)
5. `yarn run build` or `npm run build` to build the app for production in the `./build` directory.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Check out `React-README.md` for more information.

## Redesign
This branch is for reorganizing/documenting to make the code easier to read.
