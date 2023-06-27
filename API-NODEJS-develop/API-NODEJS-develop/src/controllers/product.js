import Product from '../model/product'
import { ProductJoi } from '../schema/product'
import Category from '../model/category'
import moment from 'moment/moment';
//them
export const CreateProduct = async (req, res) => {
    const query = req.query
    console.log(query)
    try {
        const body = req.body;
        const { error } = ProductJoi.validate(body)
        if (error) {
            const errors = error.details.map((errItem) => errItem.message)
            return res.status(400).json({
                message: errors
            });
        }
        // const { data } = await axios.post("http://localhost:3000/products", body);
        const product = await Product.create(body)
        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id
            }
        });
        if (!product) {
            return res.status(400).json({ message: "Thêm sản phẩm thất bại" });
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            product
        });
    } catch (err) {
        return res.json(err.message)
    }
};
//xoa
export const RemoveProduct = async (req, res) => {
    const id = req.params.id
    console.log(id)
    // const { data } = await axios.delete("http://localhost:3000/products/" + req.params.id);
    const data = await Product.findOneAndDelete({ _id: id })
    res.json({
        message: "XOA sản phẩm thành công",
        data

    })
}
//getAll
export const getAll = async function (req, res) {
    const { _sort = "createdAt", _order = "desc", _limit = 8, _page = 1 } = req.query;

    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order == "desc" ? -1 : 1,
        },
    };

    try {
        const { docs, totalDocs, totalPages } = await Product.paginate({}, options);
        if (docs.length === 0) {
            return res.status(400).json({ message: "Không có sản phẩm nào" });
        }

        const formattedDocs = docs.map(doc => ({
            ...doc.toObject(),
            createdAt: moment(doc.createdAt).format('HH:mm'),
        }));

        return res.status(200).json({ data: formattedDocs, totalDocs, totalPages });
    } catch (error) {
        return res.json({
            message: error.message,
        });
    }
}
//getOne
export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Product.findById(id);
        return res.json({
            message: "Tim thay 1 san pham",
            data
        })
    } catch (error) {
        return res.json({
            message: "Tim 1 san pham that bai ao vlin",
            error
        })
    }
}
//update
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const data = await Product.findByIdAndUpdate(id, body, { new: true });
        return res.json({
            message: "Sua thanh cong",
            data
        })
    } catch (error) {
        return res.json({
            message: "sua that bai",
            error
        })
    }
}
// product price ascend
export const getProductPriceAscending = async (req, res) => {
    try {
        const productPriceAscend = await Product.find({}).sort({ price: 1 });
        return res.json({
            message: "Sắp xếp sản phẩm thành công theo giá tăng dần",
            productPriceAscend
        });
    } catch (error) {
        return res.json({
            message: "Lỗi khi sắp xếp sản phẩm theo giá tăng dần",
            error
        });
    }
};
// product price descend
export const getProductPriceDescending = async (req, res) => {
    try {
        const productPriceDescend = await Product.find({}).sort({ price: -1 });
        return res.json({
            message: "Sắp xếp sản phẩm thành công theo giá giả dần",
            productPriceDescend
        });
    } catch (error) {
        return res.json({
            message: "Lỗi khi sắp xếp sản phẩm theo giá giảm dần",
            error
        });
    }
};

//search product

export const searchProduct = async (req, res) => {
    try {
        const name = req.query.name;
        const regex = new RegExp(name, "i");

        const data = await Product.find({ name: regex });
        return res.json({
            message: "Tìm thấy sản phẩm",
            data,
        });
    } catch (error) {
        return res.json({
            message: "Không tìm thấy sản phẩm",
            error,
        });
    }
};


// quan1234
