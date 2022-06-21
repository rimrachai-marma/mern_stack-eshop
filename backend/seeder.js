require('dotenv').config();
const mongoose = require('mongoose');

const users = require('./data/user');
const products = require('./data/product');

const User = require('./models/user-model');
const Product = require('./models/product-model');
const Order = require('./models/order-model');

//DB connect
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((conn) => {
    console.log(
      `Mongodb Connected to: ${conn.connection.host}, ${conn.connection.name} on PORT ${conn.connection.port} `
    );
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB,\nError: ', err);
  });

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
