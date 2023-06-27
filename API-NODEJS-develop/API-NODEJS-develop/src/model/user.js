import mongoose from "mongoose";

const userShema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: String,
    role: {
        type: String,
        default: "member"
    },
    cart: { type: mongoose.Types.ObjectId, ref: 'Cart' } // Tham chiếu đến model Cart hoặc sử dụng kiểu dữ liệu tương ứng
})
export default mongoose.model("User", userShema)