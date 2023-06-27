import User from "../model/user"
import { signinSchema, validateSingup } from "../schema/auth"
import bcryct from "bcryptjs"
import jwt from "jsonwebtoken"
import Cart from "../model/cart"
export const signup = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        const { error } = validateSingup.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ message: errors });
        }

        const hashedPassword = await bcryct.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
            password: hashedPassword,
        });

        // Tạo cart mới cho user
        const cart = new Cart({ userId: user._id });
        await cart.save();

        // Gán cartId cho user
        user.cart = cart._id;
        await user.save();

        const accessToken = jwt.sign({ _id: user._id }, "boquan", { expiresIn: "1d" });

        return res.status(200).json({
            message: "Đăng ký thành công",
            accessToken,
            user
        });
    } catch (err) {
        return res.status(404).json({ message: err });
    }
};

//sign in
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                messages: errors,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Bạn chưa đăng ký tài khoản",
            });
        }

        const isMatch = await bcryct.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            });
        }

        const accessToken = jwt.sign({ _id: user._id }, "boquan", { expiresIn: "1d" });

        return res.status(201).json({
            message: "Dang nhap thanh cong",
            accessToken,
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const getAllUser = async function (req, res) {
    try {
        const user = await User.find();
        if (user.length === 0) {
            return res.status(400).json({ message: 'Không có user' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.json({
            message: error.message,
        });
    }
}


// GetOneUser
export const GetOneUser = async function (req, res) {
    try {
        const id = req.params.id
        // const { data } = await axios.get('http://localhost:3000/products/' + id)
        const data = await User.findById(id)
        if (data.length === 0) {
            return res.status(200).json({ message: "rong" })
        }
        return res.json(data)
    } catch (err) {
        return res.status(500).json({ message: "loi api" })
    }


}

export const RemoveUser = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        // Kiểm tra quyền truy cập của user
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, "boquan");
        const loggedInUserId = decoded._id;

        // Lấy thông tin của người dùng đang đăng nhập
        const user = await User.findById(loggedInUserId);

        // Kiểm tra xem user có phải là admin hoặc đang xoá chính mình không
        if (!user) {
            throw new Error("User không tồn tại");
        }

        if (user.role !== "admin" && id !== loggedInUserId.toString()) {
            throw new Error("Bạn không có quyền thực hiện hành động này");
        }

        if (id === loggedInUserId.toString()) {
            // Xoá tài khoản user
            await User.findByIdAndDelete(id);

            return res.json({
                message: "Xoá user thành công",
                data: user
            });
        }

        // Xoá user
        const data = await User.findOneAndDelete({ _id: id });
        res.json({
            message: "Xoá user thành công",
            data
        });
    } catch (error) {
        return res.status(401).json({
            message: error.message || "Lỗi xảy ra khi xoá user",
        });
    }
};


export const getAllUserByRole = async function (req, res) {
    try {
        const users = await User.find({ role: { $ne: 'admin' } });
        if (users.length === 0) {
            return res.status(400).json({ message: 'Không có người dùng' });
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.json({
            message: error.message,
        });
    }
}