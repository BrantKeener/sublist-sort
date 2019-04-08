# sublist-sort

A sorter which takes in data and sorts it into lists and sublists.
This utilizes either an 0(n<sup>2</sup>), or an 0(n) methodology.

## Getting Started

Cloning and forking with git are easy. To clone, head over to [sublist-sort](https://github.com/BrantKeener/sublist-sort) and navigate using the clone or download button. Copy the link, and perform 
`git clone {copied link}`.

If you would just like to run the full program with a DB, click on the [Sublist Heroku Link](https://lit-everglades-84165.herokuapp.com/).

### Prerequisites

If you wish to simply test the data sorting methodologies, you can simply test it at [sublist-sort](https://brantkeener.github.io/sublist-sort/). This will pull up the github pages which has an array designed just like the response data from the server.

In order to run this application with a DB, you will need to install [node.js](https://nodejs.org/en/) if you have not yet done so.

For any development, work with your favorite code editor, or try out [VS Code](https://code.visualstudio.com/download).

You might find the [mySQL workbench](https://www.mysql.com/products/workbench/) helpful if you do not wish to work in the CLI.

### Installing

Setting up your local development environment should be painless. Begin by running

`npm i`

You will need a `.env` file to perform any local testing/development since the app utilizes both bcrypt for password encryption, and S3 bucket for image storage.

Create your new `.env` file, and add to it the following data:

```
SUBLIST_PASS={whatever the password is for the DB you have chosen to use}
DB_PORT={port on which you have your DB}
```

## Deployment

Deploying with a server will require a service like Heroku.

## Built With

* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)
* [express](https://expressjs.com/)

## Contributing

Contributing is currently locked and by invite only.

## Versioning

All versioning is controlled through GitHub

## Authors

* **Brant Keener** - *Full app creation* - [BrantKeener](https://github.com/BrantKeener)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.