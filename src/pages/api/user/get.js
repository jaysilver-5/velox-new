// pages/api/transactions/get.js
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import Transaction from '../../../../models/Transaction';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { emailAddress } = req.query;

        if (!emailAddress) {
          return res.status(400).json({ success: false, message: 'Email address is required' });
        }

        const user = await User.findOne({ emailAddress }).populate('transactions');
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user.transactions });
      } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Invalid request method' });
      break;
  }
}
