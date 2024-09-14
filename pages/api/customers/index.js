import dbConnect from '../../../lib/dbConnect';
import Contact from '../../../models/Contact';

export default async function handler(req, res) {
  await dbConnect(); // Ensure the database connection is established

  if (req.method === 'GET') {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to load customers' });
    }
  } else if (req.method === 'POST') {
    const { name, phone, address, acServiceDates, roServiceDates } = req.body;
    
    if (!name || !phone || (!acServiceDates.length && !roServiceDates.length)) {
      return res.status(400).json({ message: 'Name, phone, and at least one service date are required.' });
    }
    
    try {
      const newCustomer = new Contact({ name, phone, address, acServiceDates, roServiceDates });
      await newCustomer.save();
      res.status(201).json({ message: 'Contact added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add contact' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
