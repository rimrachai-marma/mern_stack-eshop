require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const userRouter = require('./routes/user-routes');
const productRouter = require('./routes/product-routes');
const cartRouter = require('./routes/cart-routes');
const orderRouter = require('./routes/order-routes');
const paymentRouter = require('./routes/payment-routes');
const uploadRouter = require('./routes/upload-routes');

const { errorHandler, notFound } = require('./middleware/error-middleware');

//App Config
const app = express();

//Middleware
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', orderRouter);
app.use('/api', paymentRouter);
app.use('/api', uploadRouter);

app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(path.resolve(), '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(path.resolve() + '/frontend/build/index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('Server is running...');
  });
}

app.use(notFound);
app.use(errorHandler);

//DB Config
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((conn) => {
    console.log(
      `Mongodb Connected to: ${conn.connection.host}, ${conn.connection.name} on PORT ${conn.connection.port} `
    );

    //Listener
    const PORT = process.env.PORT;
    app.listen(PORT, () =>
      console.log(
        `Server running on PORT ${PORT}\nLocal:\thttp://localhost:${PORT}`
      )
    );
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB,\nError: ', err.message);
  });
