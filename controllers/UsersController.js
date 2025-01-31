import crypto from "crypto";
import dbClient from "../utils/db";

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }
    if (!password) {
      return res.status(400).json({ error: "Missing password" });
    }

    try {
      if (!dbClient.isAlive()) {
        return res.status(500).json({ error: "Database not connected" });
      }

      const usersCollection = dbClient.db.collection("users");

      // Check if email already exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Already exist" });
      }

      const hashedPassword = crypto
        .createHash("sha1")
        .update(password)
        .digest("hex");

      const result = await usersCollection.insertOne({
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ id: result.insertedId, email });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default UsersController;
