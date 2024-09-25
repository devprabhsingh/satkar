import dbConnect from "../../lib/dbConnect";
import Contact from "../../models/Contact";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const {
        name,
        phone,
        acServiceDates,
        roServiceDates,
        fridgeServiceDates,
        wmServiceDates,
        geyserServiceDates,
      } = req.body;

      // Ensure arrays are initialized if they are undefined or null
      const acDates = acServiceDates || [];
      const roDates = roServiceDates || [];
      const fridgeDates = fridgeServiceDates || [];
      const wmDates = wmServiceDates || [];
      const geyserDates = geyserServiceDates || [];

      // Create a new contact document
      const contact = new Contact({
        name,
        phone,
        acServiceDates: acDates,
        roServiceDates: roDates,
        fridgeServiceDates: fridgeDates,
        wmServiceDates: wmDates,
        geyserServiceDates: geyserDates,
      });

      // Save the document to MongoDB
      await contact.save();

      res.status(201).json({ message: "Contact added successfully" });
    } catch (error) {
      console.error("Error adding contact:", error);
      res.status(500).json({ error: "Failed to add contact" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
