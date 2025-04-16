import mongoose from "mongoose";

const mpesaSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    trnx_id: { type: String, required: true },
    amount: { type: String, required: true },
  },
  { collection: "mpesa", timestamps: true }
);

const mpesaModel = mongoose.model("mpesa", mpesaSchema);

export { mpesaModel };
