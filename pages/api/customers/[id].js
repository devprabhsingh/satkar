import dbConnect from '../../../lib/dbConnect';
import Contact from '../../../models/Contact';

export default async function handler(req, res) {
  await dbConnect(); // Ensure the database connection is established
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const contact = await Contact.findById(id);
      if (!contact) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ message: 'Failed to load customer' });
    }
  } else if (req.method === 'PUT') {
    const { name, phone, address, acServiceDates, roServiceDates } = req.body;

    try {
      const updatedCustomer = await Contact.findByIdAndUpdate(
        id,
        { name, phone, address, acServiceDates, roServiceDates },
        { new: true }
      );
      if (!updatedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update customer' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedCustomer = await Contact.findByIdAndDelete(id);
      if (!deletedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete customer' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
