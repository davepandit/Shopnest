import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/user.js';
import products from './data/data.js'
import User from './models/user.models.js';
import Product from './models/products.models.js'
import Order from './models/orders.models.js'
import connectToDatabase from './config/db.js'

dotenv.config();

connectToDatabase();

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
    console.error(`${error}`);
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
    console.error(`${error}`);
    process.exit(1);
  }
};


console.log(process.argv)
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}