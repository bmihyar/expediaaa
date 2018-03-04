# Expedia Apis testing

This App simulates reading Expedia JSON APIs and building simple UI to show hotels offers

This App is using [Express 4](http://expressjs.com/).

Demo for the App is available on Heroku (https://expediaaa.herokuapp.com/)

## Running Locally

Make sure you have [Node.js](http://nodejs.org/)

```sh
$ git clone https://github.com/bmihyar/expediaaa.git
$ cd expediaaa
$ npm i
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Tesing Expedia APIs

This App depends on Expedia APIs' availability and the format it returns. You can test this API by running:

```sh
npm test