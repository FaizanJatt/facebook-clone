import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;
const options = {
  // useUnifiedTopology: true,
  // useNewUrlParser: true,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URL) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    console.log("trying to connect");
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  console.log("trying to connect");
  clientPromise = global._mongoClientPromise;
  console.log("connected");
} else {
  console.log("in the else loop");
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
