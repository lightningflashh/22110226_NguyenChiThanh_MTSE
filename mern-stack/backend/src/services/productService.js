import Product from '~/models/productModel.js'
const getAllProducts = async ({ page = 1, limit = 10 }) => {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    try {
        const [products, totalProducts] = await Promise.all([
            Product.find()
                .skip(skip)
                .limit(limitNum)
                .sort({ createdAt: -1 }),
            Product.countDocuments()
        ]);

        const totalPages = Math.ceil(totalProducts / limitNum);

        return {
            products,
            page: pageNum,
            limit: limitNum,
            totalPages,
            totalProducts
        };
    } catch (error) {
        throw new Error(`Lỗi Service khi lấy danh sách sản phẩm: ${error.message}`);
    }
};

const createNewProduct = async (productData) => {
    if (!productData.name || !productData.price || !productData.image || !productData.category || !productData.brand) {
        throw new Error('Vui lòng cung cấp đầy đủ tên, giá, hình ảnh, danh mục và thương hiệu.');
    }

    // Tạo sản phẩm mới với rating/numReviews mặc định là 0
    return await Product.create({
        ...productData,
        rating: 0,
        numReviews: 0
    });
};

const getProductById = async (id) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new Error('Không tìm thấy sản phẩm');
    }
    return product;
};


const updateExistingProduct = async (id, updateData) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new Error('Không tìm thấy sản phẩm');
    }

    // Ngăn chặn cập nhật trường tính toán tự động
    if (updateData.rating !== undefined || updateData.numReviews !== undefined) {
        throw new Error('Không được cập nhật trường rating/numReviews thủ công.');
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    return updatedProduct;
};

const deleteProductById = async (id) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new Error('Không tìm thấy sản phẩm');
    }

    await Product.findByIdAndDelete(id);
    return id;
};

export const productService = {
    getAllProducts,
    createNewProduct,
    getProductById,
    updateExistingProduct,
    deleteProductById,
};