import { MongoClient } from "mongodb";

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || "localhost";
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || "files_manager";

    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.dbName = database;
    this.connected = false;

    // Establish the connection
    this.client
      .connect()
      .then(() => {
        this.db = this.client.db(this.dbName);
        this.connected = true;
        console.log("Connected to MongoDB successfully");
      })
      .catch((err) => {
        console.error(`Error connecting to MongoDB: ${err.message}`);
      });
  }

  // Check if MongoDB is connected
  isAlive() {
    return this.connected;
  }

  // Count the number of users in the "users" collection
  async nbUsers() {
    if (!this.connected) {
      return 0;
    }
    const usersCollection = this.db.collection("users");
    return usersCollection.countDocuments();
  }

  //   Count the number of fils in the "files" collection
  async nbFiles() {
    if (!this.connected) {
      return 0;
    }
    const filesCollection = this.db.collection("files");
    return filesCollection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
