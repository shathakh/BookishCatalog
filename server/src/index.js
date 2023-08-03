const app = require('./app');
const sequelize = require('./db/config/connection');

const PORT = app.get('port');

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`the server is running on http://localhost:${PORT}`);
    });
  })
  .catch(() => console.log('error on synchronizing db'));
