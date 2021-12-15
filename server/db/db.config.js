import mongoose from "mongoose";

async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connect database successfully!");
  } catch (error) {
    console.log("Connect database failure!");
  }
}

export default connectMongo;
