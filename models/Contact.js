import mongoose from "mongoose";

const serviceDateSchema = new mongoose.Schema({
  date: {
    type: String,
    required: false, // Date is not required if the array is empty
  },
  description: {
    type: String,
    required: false, // Description is not required if the array is empty
  },
  price: {
    type: Number,
    required: false, // Price is not required if the array is empty
  },
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  acServiceDates: {
    type: [serviceDateSchema],
    required: false, // Not required, allows empty array
  },
  roServiceDates: {
    type: [serviceDateSchema],
    required: false, // Not required, allows empty array
  },
  fridgeServiceDates: {
    type: [serviceDateSchema],
    required: false, // Not required, allows empty array
  },
  wmServiceDates: {
    type: [serviceDateSchema],
    required: false, // Not required, allows empty array
  },
  geyserServiceDates: {
    type: [serviceDateSchema],
    required: false, // Not required, allows empty array
  },
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
