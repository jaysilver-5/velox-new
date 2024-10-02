import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import Transaction from '../../../../models/Transaction';

export default async function handler(req, res) {
  const { method } = req;

  // Connect to the database
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { emailAddress, transactionData } = req.body;

        // Find user by email address
        const user = await User.findOne({ emailAddress });
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Destructure transactionData to get the transaction fields
        const {
          transactionId,
          amount_dollar,
          amount_naira,
          type,
          status,
          coin_name,
          rate,
          network,
          transaction_proof,            // transaction_proof field (this is your encoded image)
          bankname,         // optional
          accountNumber,    // optional
          walletAddress     // optional
        } = transactionData;

        // Check for missing required fields
        if (
          !transactionId ||
          !amount_dollar ||
          !amount_naira ||
          !type ||
          !status ||
          !coin_name ||
          !rate ||
          !network
        ) {
          return res.status(400).json({
            success: false,
            message: 'Missing required transaction fields.'
          });
        }

        // Create a new transaction object
        const transaction = new Transaction({
          transactionId,
          amount_dollar,
          amount_naira,
          type,
          status,
          coin_name,
          rate,
          network,
          transaction_proof,
          bankname: bankname || '',
          accountNumber: accountNumber || '',
          walletAddress: walletAddress || ''
        });

        // Save the new transaction
        await transaction.save();

        // Add the transaction to the user's transactions array
        user.transactions.push(transaction._id);
        await user.save();

        // Respond with the newly created transaction
        res.status(201).json({ success: true, data: transaction });
      } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'GET':
      try {
        const { emailAddress } = req.query;

        // Find user by email address
        const user = await User.findOne({ emailAddress }).populate('transactions');
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Map through transactions and omit certain fields
        const transactions = user.transactions.map(transaction => ({
          transactionId: transaction.transactionId,
          amount_dollar: transaction.amount_dollar,
          amount_naira: transaction.amount_naira,
          type: transaction.type,
          status: transaction.status,
          coin_name: transaction.coin_name,
          rate: transaction.rate,
          network: transaction.network,
          // Omit transaction_proof, bankname, accountNumber, walletAddress
        }));

        // Respond with the list of transactions
        res.status(200).json({ success: true, data: transactions });
      } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Invalid request method' });
      break;
  }
}
