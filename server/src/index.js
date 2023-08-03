const app = require('./app');
const PORT = app.get('port');

app.listen(PORT, () => {
    console.log(`the server is running on http://localhost:${PORT}`);
  });