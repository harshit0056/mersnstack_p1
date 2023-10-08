const mongoose = require("mongoose");

const mongoURI = 'mongodb://guptaharshit0056:%40h2706g2001@ac-c9c6get-shard-00-00.kn4yyxw.mongodb.net:27017,ac-c9c6get-shard-00-01.kn4yyxw.mongodb.net:27017,ac-c9c6get-shard-00-02.kn4yyxw.mongodb.net:27017/mern_studio?ssl=true&replicaSet=atlas-vfjoub-shard-0&authSource=admin&retryWrites=true&w=majority'; 

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
