const express = require('express');
 const loginRouter = require('./database/middlewares/routers/loginRouter');
 const userRouter = require('./database/middlewares/routers/userRouter');
 const categoryRouter = require('./database/middlewares/routers/categoryRouter');
// ...

const app = express();
app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
