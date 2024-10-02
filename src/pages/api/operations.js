// /pages/api/operation.js

import dbConnect from '../../../lib/dbConnect';
import Operation from '../../../models/Operation';

export default async function handler(req, res) {
  const { method } = req;

  // Connect to database
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { network } = req.query;
        let operations;
        if (network) {
          // Get operation with the specific network address
          operations = await Operation.find({ [`payment_address.${network}`]: { $exists: true } });
        } else {
          operations = await Operation.find({});
        }

        if (operations.length === 0) {
          return res.status(404).json({ success: false, message: 'No operation found' });
        }

        res.status(200).json({ success: true, data: operations[0] }); // Return the single document
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'POST':
      try {
        // First, check if there's already an entry
        const existingOperations = await Operation.find({});

        if (existingOperations.length > 0) {
          return res.status(400).json({ success: false, message: 'An operation already exists' });
        }

        // Create a new operation if none exists
        const operation = await Operation.create(req.body);
        res.status(201).json({ success: true, data: operation });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'PATCH':
      try {
        const update = req.body;

        // Find the first operation and update it
        const operation = await Operation.findOneAndUpdate({}, update, {
          new: true,
          runValidators: true,
        });

        if (!operation) {
          return res.status(404).json({ success: false, message: 'No operation found to update' });
        }

        res.status(200).json({ success: true, data: operation });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'DELETE':
      try {
        // Find and delete the first operation
        const deletedOperation = await Operation.findOneAndDelete({});

        if (!deletedOperation) {
          return res.status(404).json({ success: false, message: 'No operation found to delete' });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}


// // pages/api/operation.js

// import dbConnect from '../../../lib/dbConnect';
// import Operation from '../../../models/Operation';

// export default async function handler(req, res) {
//   await dbConnect();

//   const { method, query: { network }, body } = req;

//   switch (method) {
//     // GET: Fetch operation data and payment address by network
//     case 'GET':
//       try {
//         const operation = await Operation.findOne(); // Always fetch the single document
//         if (!operation) {
//           return res.status(404).json({ message: 'Operation not found' });
//         }

//         // Return the payment address based on the network
//         const paymentAddress = operation.payment_address?.get(network) || 'Network not found';

//         res.status(200).json({
//           ...operation.toObject(),
//           payment_address: paymentAddress, // Return the payment address for the specific network
//         });
//       } catch (error) {
//         res.status(500).json({ message: 'Server Error', error: error.message });
//       }
//       break;

//     // POST: Create or replace the single operation document
//     case 'POST':
//       try {
//         const { buyrate, sellrate, maxBuy, minBuy, payment_bank, payment_account, payment_address } = body;

//         let operation = await Operation.findOne();

//         if (operation) {
//           // If operation exists, overwrite it
//           operation.buyrate = buyrate;
//           operation.sellrate = sellrate;
//           operation.maxBuy = maxBuy;
//           operation.minBuy = minBuy;
//           operation.payment_bank = payment_bank;
//           operation.payment_account = payment_account;
//           operation.payment_address = new Map(Object.entries(payment_address));
//         } else {
//           // Otherwise, create a new operation document
//           operation = new Operation({
//             buyrate,
//             sellrate,
//             maxBuy,
//             minBuy,
//             payment_bank,
//             payment_account,
//             payment_address: new Map(Object.entries(payment_address)),
//           });
//         }

//         const savedOperation = await operation.save();
//         res.status(201).json(savedOperation);
//       } catch (error) {
//         res.status(500).json({ message: 'Server Error', error: error.message });
//       }
//       break;

//     // PATCH: Update only the fields that are provided
//     case 'PATCH':
//       try {
//         let operation = await Operation.findOne();

//         if (!operation) {
//           return res.status(404).json({ message: 'Operation not found' });
//         }

//         // Update only the fields provided in the request body
//         Object.keys(body).forEach(key => {
//           if (key === 'payment_address') {
//             // If payment_address is being updated, handle it as a Map
//             operation.payment_address = new Map(Object.entries(body.payment_address));
//           } else {
//             operation[key] = body[key];
//           }
//         });

//         const updatedOperation = await operation.save();
//         res.status(200).json(updatedOperation);
//       } catch (error) {
//         res.status(500).json({ message: 'Server Error', error: error.message });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }
