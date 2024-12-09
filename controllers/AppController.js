import dbClient from '../utils/db.js';
import redisClient from '../utils/redis.js';

class AppController {
  /**
   * GET /status
   * Returns the status of Redis and DB connections
   */
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  /**
   * GET /stats
   * Returns the count of users and files in the database
   */
  static async getStats(req, res) {
    try {
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();

      res.status(200).json({
        users: usersCount,
        files: filesCount,
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching stats' });
    }
  }
}

export default AppController;
