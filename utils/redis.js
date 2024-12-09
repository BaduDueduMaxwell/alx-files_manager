const redis = require("redis");

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on("error", (err) => {
      console.error(`Redis client error: ${err}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  // Get the value of a key in Redis
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          console.error(`Error getting key ${key}: ${err}`);
          return reject(err);
        }
        resolve(value);
      });
    });
  }

  // Set a key-value pair in Redis with an expiration time
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err) => {
        if (err) {
          console.error(`Error setting key ${key}: ${err}`);
          return reject(err);
        }
        resolve();
      });
    });
  }

  // Delete a key from Redis
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          console.error(`Error deleting key ${key}: ${err}`);
          return reject(err);
        }
        resolve();
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
