import Joi from 'joi'
export const ProductJoi = Joi.object({
    name: Joi.string().trim().min(1).max(20).required().messages({
        "string.empty": "Khong duoc de trong name",
        "any.required": "Truong name la truong bat buoc",
        "string.min": "Truong ten phai co it nhat {#limit} ky tu",
        "string.max": "Truong ten phai co nhieu nhat {#limit} ky tu}"
    }),
    price: Joi.number().positive().required().messages({
        "number.base": "Price phai la mot so",
        "any.required": "Price phai bat buoc co",
        "number.positive": " Price phai lon hon 0 ",

    }),
    desc: Joi.string().required().messages({
        "string.empty": "Khong duoc de trong desc",
        "any.required": "Truong desc phai la bat buoc"
    }),
    img: Joi.string().required().messages({
        "string.empty": "Khong duoc de trong anh",
        "any.required": "Truong anh phai la bat buoc"
    }),
    categoryId: Joi.string().required().messages({
        "string.empty": "Khong duoc de trong categoryID",
        "any.required": "Truong categoryID phai la bat buoc"
    }),
})
