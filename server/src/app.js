const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const balanceRoutes = require('./router/balanceRoutes');

const { PORT } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());

app.use('/', balanceRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
