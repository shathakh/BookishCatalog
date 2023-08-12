# Bookish Catalog :book:

A full-stack web application for managing a personal book collection. The application allows users to add new books to their collection, view the list of books they have, and provide authorization through a login page.

 


## Database Schema
- [Database](https://drawsql.app/teams/shatha-1/diagrams/book-collection)
- ![schema](https://github.com/shathakh/BookishCatalog/assets/77805478/6997d5cb-b972-46f6-ae02-4cb22257bd7b)



## Installation
> Make sure Postgresql, Node.js, and Git are installed before beginning the installation.

1. Clone the repo
   ```sh
   git clone https://github.com/shathakh/BookishCatalog.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
   
3. Create a database, write these commands in SQL shell(psql)
   ```sh 
   \i <path for init.sql file> <server/src/db/init.sql>
   \c postgres://visitor:123456@localhost:5432/book_catalog <connect database>
    ```

4. To build the database write in the terminal ``` npm run db:seed```

5. In the server folder, rename `.env.example` file to `.env` and fill in the environment variables
   ```sh
   JWT_SECRET='<your secret key>'
   DEV_DATABASE_URL=postgres://<username>:<password>@localhost:<port || 5432>/<development database that we previously created in point3>
   TEST_DATABASE_URL=postgres://<username>:<password>@localhost:<port || 5432>/<test database>
   USER_TOKEN='<using in APIs tests>'
   ```

6. To run the server, you can run the ``` npm run dev ```  and to run the client server you need to ```npm run client```

> You can create a new user and If you want to view books after building the database you can log in with this user.
> 
> email: ahmed@gmail.com
> password: 123456


## Built With

* [Vue2.js](https://v2.vuejs.org/v2/guide/installation.html#CLI)
* [Express.js](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* [Vuetify](https://v2.vuetifyjs.com/en/getting-started/installation/)
* [Vuelidate](https://vuelidate.js.org/#getting-started)
* [JWT](https://jwt.io/introduction)



### Future Enhancement

- add a section for favorite books.
- filter books depending on the category.
- create a single component for every book.
