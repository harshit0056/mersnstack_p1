const mongoose = require("mongoose");

const mongoURI = 'mongodb://127.0.0.1/StudioMart'; 

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected!');
    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
    global.food_items = fetched_data;
    global.foodCategory = foodCategory;
    // console.log(global.foodCategory);
    // // console.log(global.food_items);
  } catch (error) {
    console.log('err: ', error);
  }
};

module.exports = mongoDB;

