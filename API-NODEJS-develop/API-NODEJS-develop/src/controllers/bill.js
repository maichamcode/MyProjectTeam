
import Bill from '../model/bill'
import jwt from "jsonwebtoken"
export const addBill = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("Bạn chưa đăng nhập");
        }
        const decoded = jwt.verify(token, "boquan");
        const userId = decoded._id;
        // Lấy thông tin hóa đơn từ request body
        const body = req.body;

        // Kiểm tra và validate dữ liệu đầu vào nếu cần thiết

        // Tạo một instance của model "Bill" với thông tin hóa đơn


        // Lưu thông tin hóa đơn vào cơ sở dữ liệu
        const data = await Bill.create({
            userId: userId,
            name: body.name,
            email: body.email,
            province: body.province,
            district: body.district,
            ward: body.ward,
            phone: body.phone,
            numberHouse: body.numberHouse,
            products: body.products,
            payment: body.payment,
            date: body.date,
            price: body.price
        })

        // Trả về phản hồi thành công
        return res.status(200).json({ message: 'Hóa đơn đã được thêm thành công', data });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm hóa đơn' });
    }
};
export const searchBill = async (req, res) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("Bạn chưa đăng nhập");
        }
        const decoded = jwt.verify(token, "boquan");
        const userId = decoded._id;
        // Tìm tất cả các hóa đơn của userId trong cơ sở dữ liệu
        const bills = await Bill.find({ userId });

        return res.status(200).json({ data: bills });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi tìm hóa đơn' });
    }
}
export const GetOneBill = async (req, res) => {
    try {

        const id = req.params.id;
        // Tìm tất cả các hóa đơn của userId trong cơ sở dữ liệu
        const bills = await Bill.findById(id);

        return res.status(200).json({ data: bills });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi tìm hóa đơn' });
    }
}
export const RemoveBill = async (req, res) => {
    try {

        const id = req.params.id;
        // Tìm tất cả các hóa đơn của userId trong cơ sở dữ liệu
        const bills = await Bill.findOneAndDelete({ _id: id });

        return res.status(200).json({ data: bills });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi tìm hóa đơn' });
    }
}
export const GetAllBill= async function (req, res) {
    try {
        const data = await Bill.find();
        if (data.length == 0) {
            return res.status(400).json({ message: "Don't have any Category" });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.json({
            message: error.message,
        });
    }
}
