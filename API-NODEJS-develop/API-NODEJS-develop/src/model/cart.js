import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: [{ type: Number }],// Tham chiếu đến model User hoặc sử dụng kiểu dữ liệu tương ứng
    products: [
        {
            type: mongoose.Types.ObjectId, ref: 'Product'  // Tham chiếu đến model Product hoặc sử dụng kiểu dữ liệu tương ứng
        }
    ],

});


export default mongoose.model("Cart", cartSchema);
