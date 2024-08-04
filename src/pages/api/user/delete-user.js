import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = auth();

  try {
    await clerkClient.users.deleteUser(userId);
    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error deleting user' });
  }
}
