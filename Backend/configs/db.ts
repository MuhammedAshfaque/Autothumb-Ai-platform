import mongoose from 'mongoose';
export const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });
    await mongoose.connect(process.env.MONGO_URI as string);
    } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};
