// pages/api/transactions/add.js
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import Transaction from '../../../../models/Transaction';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { emailAddress, transactionData } = req.body;

        console.log('Request Body:', req.body);

        const user = await User.findOne({ emailAddress });
        if (!user) {
          console.error('User not found for email:', emailAddress);
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        console.log('User found:', user);

        const transaction = new Transaction(transactionData);
        await transaction.save();

        console.log('Transaction saved:', transaction);

        user.transactions.push(transaction._id);
        await user.save();

        console.log('User updated with new transaction:', user);

        res.status(200).json({ success: true, data: transaction });
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
