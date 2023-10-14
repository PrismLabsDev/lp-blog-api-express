# LP Blog API Express

This project is an implementation of the API following the [PrismLabsDev/learning-projects - Blog](https://github.com/PrismLabsDev/learning-projects) project documentation. 

This project also relies on the docker environment included in the [PrismLabsDev/learning-projects](https://github.com/PrismLabsDev/learning-projects) repo. You can setup your own environment if you wish but we will require MongoDB and an SMTP server for the application to run correctly.

## Running application

``` bash
npm install
cp .env.example .env

# Generate app key for auth, enter this in your terminal running node and add to env AUTH_TOKEN
require('crypto').randomBytes(16).toString('hex')

npm run dev
```

## Test application

``` bash
npm run test
```