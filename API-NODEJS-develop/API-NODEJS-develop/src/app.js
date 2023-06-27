
import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import RouterProduct from "../src/router/product"
import RouterCategory from "../src/router/category"
import RouterAuth from "../src/router/auth"
import RouterCart from "../src/router/cart"
import RouterBill from "../src/router/bill"

const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));


app.use('/api', RouterProduct)
app.use('/api', RouterCategory)
app.use('/api', RouterAuth)
app.use('/api', RouterCart)
app.use('/api', RouterBill)


mongoose.connect("mongodb://127.0.0.1:27017/ASM2_ANGULAR_NHOM8", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
}).then(() => {
    console.info('Connect database successfully'); // check cais nafy để biết là nó connect với thằng database chưa đừng dùng cái cú dùng cái cũ mày đéo biết là nó con nect thanh công hay không
})
    .catch((error) => {
        console.info(error);
    });; // nameDatabase là tên database admin là user sau : là pass muốn thêm acc thì thêm trong thằng database access

export const viteNodeApp = app