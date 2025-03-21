import dbConnect from '../../../../lib/dbConnect';
import Transaction from '../../../../models/Transaction';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const transactions = await Transaction.find({}).select('-transaction_proof -bankname -accountNumber -walletAddress');
        res.status(200).json({ success: true, data: transactions });
      } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const { transactionId, status } = req.body;

        if (!transactionId || !status) {
          return res.status(400).json({ success: false, message: 'transactionId and status are required.' });
        }

        const updatedTransaction = await Transaction.findOneAndUpdate(
          { transactionId },
          { status },
          { new: true }
        );

        if (!updatedTransaction) {
          return res.status(404).json({ success: false, message: 'Transaction not found.' });
        }

        res.status(200).json({ success: true, data: updatedTransaction });
      } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { transactionId } = req.body;

        if (!transactionId) {
          return res.status(400).json({ success: false, message: 'transactionId is required.' });
        }

        const deletedTransaction = await Transaction.findOneAndDelete({ transactionId });

        if (!deletedTransaction) {
          return res.status(404).json({ success: false, message: 'Transaction not found.' });
        }

        res.status(200).json({ success: true, message: 'Transaction successfully deleted.' });
      } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
