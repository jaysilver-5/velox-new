import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

// Use a global variable to cache the connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Add connection options
    const options = {
      bufferCommands: false, // Disable mongoose buffering
      useNewUrlParser: true, // MongoDB connection URL parser
      useUnifiedTopology: true, // To handle replica set connections properly
      serverSelectionTimeoutMS: 50000, // Increase server selection timeout
      socketTimeoutMS: 45000, // Time out socket operations after 45 seconds
    };

    cached.promise = mongoose.connect(MONGO_URI, options).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
