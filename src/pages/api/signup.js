import connectDB from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();

    const { firstName, surname, emailAddress, phoneNumber, clerkId, username, referralId, referred, bankname, accountNumber } = req.body;

    try {
      const newUser = new User({
        firstName,
        surname,
        emailAddress,
        phoneNumber,
        clerkId,
        username,
        referralId,
        referred,
        bankname,
        accountNumber,
      });

      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
