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

        // Handle the proof field if it exists
        if (transactionData.proof) {
          const { data, contentType } = transactionData.proof;

          transactionData.proof = {
            data: Buffer.isBuffer(data) ? data : Buffer.from(data, 'base64'),
            contentType,
          };
        }

        // Ensure `amount` is replaced with `amount_dollar` and `amount_naira`
        const { amount_dollar, amount_naira } = transactionData;
        if (amount_dollar === undefined || amount_naira === undefined) {
          throw new Error('Both amount_dollar and amount_naira must be provided.');
        }

        const transaction = new Transaction({
          ...transactionData,
          amount_dollar,
          amount_naira,
        });
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
