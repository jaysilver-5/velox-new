// pages/api/getUser.js
import connectDB from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { emailAddress } = req.query;

    if (!emailAddress) {
      return res.status(400).json({ error: 'Email Address is required' });
    }

    try {
      await connectDB();
      const user = await User.findOne({ emailAddress });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
