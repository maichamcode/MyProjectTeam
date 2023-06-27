
import Category from '../model/category'
import { CategoryJoi } from '../schema/category';
//them 
export const CreateCategory = async (req, res) => {
    const query = req.query
    console.log(query)
    try {
        const body = req.body;
        const { error } = CategoryJoi.validate(body)
        if (error) {
            const errors = error.details.map((errItem) => errItem.message)
            return res.status(400).json({
                message: errors
            });
        }
        // const { data } = await axios.post("http://localhost:3000/products", body);
        const data = await Category.create(body)
        if (!data) {
            return res.status(400).json({ message: "Thêm danh muc thất bại" });
        }
        return res.json({
            message: "Thêm danh muc thành công",
            data
        });
    } catch (err) {
        return res.json({ message: "loi Api", err })
    }
};

//getall
export const GetAllCategory = async function (req, res) {
    try {
        const data = await Category.find();
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


export const GetOneCategory = async (req, res) => {
    try {
        const data = await Category.findById(req.params.id)
        if (!data) {
            return res.status(400).json({ message: "Don't have any Category" });
        }
        return res.json(data);
    } catch (error) {
        return res.json({
            message: error.message,
        });
    }
}





//update
export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const category = await Category.findOneAndUpdate({ _id: id }, body, { new: true });
        if (!category) {
            return res.status(400).json({ message: "Cập nhật thất bại" });
        }
        return res.json({
            message: "Cập nhật thành công",
            category,
        });
    } catch (error) {
        return res.json({
            message: error.message,
        });
    }
};

//xoa
export const DeleteCategory = async (req, res) => {
    const id = req.params.id
    // const { data } = await axios.delete("http://localhost:3000/products/" + req.params.id);
    const data = await Category.findOneAndDelete({ _id: id })
    res.json({
        message: "XOA sản phẩm thành công",

    })
}

//mai_test