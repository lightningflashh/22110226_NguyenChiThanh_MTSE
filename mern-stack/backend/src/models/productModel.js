const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên sản phẩm là bắt buộc'],
            trim: true,
            unique: true
        },
        description: {
            type: String,
            required: [true, 'Mô tả sản phẩm là bắt buộc']
        },
        image: {
            type: String,
            required: [true, 'Đường dẫn hình ảnh là bắt buộc']
        },

        price: {
            type: Number,
            required: [true, 'Giá sản phẩm là bắt buộc'],
            default: 0
        },
        countInStock: {
            type: Number,
            required: [true, 'Số lượng trong kho là bắt buộc'],
            default: 0,
            min: [0, 'Số lượng không được nhỏ hơn 0']
        },

        category: {
            type: String,
            required: [true, 'Danh mục sản phẩm là bắt buộc']
        },
        brand: {
            type: String,
            required: [true, 'Thương hiệu sản phẩm là bắt buộc']
        },

        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;