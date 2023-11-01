# Multicurrency-Wallet
A simple wallet system built with NestJS, postgres and TypeORM

## Functionalities
- A user can create an account and authenticate with a unique phone number and password
- A user can create many wallets, each with a unique currency
- User can credit their wallets
- A user can transfer from one wallet to another
- Wallet transfers over N1,000,000 must be approved by an ADMIN user
- An admin gets monthly payment summaries - capturing all payments made in the system


To get started with this project, clone the repo by running the command git clone https://github.com/Adetoyebamise/multicurrency-wallet.git or downloading the zip file

In the root of the project run the following command

```bash
 npm install
```
Start the development server (remember to put in the right environment variables) via the command

```bash
 npm run start:dev
```

The API is also documented via [postman](https://documenter.getpostman.com/view/11690328/UVe9S9cc)  and the live url can be found [here](https://Multicurrency-api.herokuapp.com/api/v1)

You can try out the transactions functionality for free using the cards credentials(Card Number, CVVs, expiry) in the documentation


### Containerizing the API
#### Build the initial docker image
```bash
docker-compose up --build
```
#### Running the Dev Docker container

To run the container, use the following command:

```bash
 docker-compose up
```

 - The server will be running on [localhost:5000](http://0.0.0.0:5000)


## CONTRIBUTING TO Multicurrency WALLET
#### While the Multicurrency-wallet project is completely free to use and open source, here are a few things to note when making Pull Requests

- Ensure the PR is made to the ```dev``` branch so it can be reviewed before it gets merged to the main branch (we are currently looking to implement a CI/CD pipeline as soon as possible) so as to automate things and reduce room for human error
- The code architecture and design pattern for the PR should be consistent with the existing codebase

## Stay in touch

- Author - [Adetoye Babalola](https://www.linkedin.com/in/adetoye-babalola-355118167/)
- Twitter - [@adetoyebamise](https://twitter.com/Adetoyebamise)

## License

Nest is [MIT licensed](LICENSE).
