import { productService } from '../services/productService.js';
import { HttpStatusCode } from 'axios'

const getProducts = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const result = await productService.getAllProducts({ page, limit });

        res.status(HttpStatusCode.Ok).json(result);
    } catch (error) {
        res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
    }
};

// =======================================================
// CREATE
// @route   POST /api/products
// =======================================================
const createProduct = async (req, res) => {
    try {
        const product = await productService.createNewProduct(req.body);
        res.status(HttpStatusCode.Created).json(product);
    } catch (error) {
        res.status(HttpStatusCode.BadRequest).json({ message: error.message });
    }
};

// =======================================================
// READ ONE
// @route   GET /api/products/:id
// =======================================================
const getProduct = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(HttpStatusCode.Ok).json(product);
    } catch (error) {
        const statusCode = error.message.includes('Không tìm thấy sản phẩm') ? HttpStatusCode.NotFound : HttpStatusCode.BadRequest;
        res.status(statusCode).json({ message: error.message });
    }
};

// =======================================================
// UPDATE
// @route   PUT /api/products/:id
// =======================================================
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateExistingProduct(req.params.id, req.body);
        res.status(HttpStatusCode.Ok).json(updatedProduct);
    } catch (error) {
        const statusCode = error.message.includes('Không tìm thấy sản phẩm') ? HttpStatusCode.NotFound : HttpStatusCode.BadRequest;
        res.status(statusCode).json({ message: error.message });
    }
};

// =======================================================
// DELETE
// @route   DELETE /api/products/:id
// =======================================================
const deleteProduct = async (req, res) => {
    try {
        const deletedId = await productService.deleteProductById(req.params.id);
        res.status(HttpStatusCode.Ok).json({ id: deletedId, message: 'Đã xóa sản phẩm thành công' });
    } catch (error) {
        const statusCode = error.message.includes('Không tìm thấy sản phẩm') ? HttpStatusCode.NotFound : HttpStatusCode.BadRequest;
        res.status(statusCode).json({ message: error.message });
    }
};


export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};