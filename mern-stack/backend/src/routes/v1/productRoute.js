import express from 'express';
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from '~/controllers/productController.js';
import { authMiddleware } from '~/middlewares/authMiddleware'

const router = express.Router();

// GET /api/products?page=X&limit=Y (Lấy danh sách, có phân trang)
router.get('', getProducts)
// POST /api/products (Tạo sản phẩm mới)
router.post('', authMiddleware.isAuthorized, authMiddleware.authorizeRoles(['admin', 'seller']), createProduct);

router.route('/:id')
    // GET /api/products/:id (Lấy chi tiết 1 sản phẩm)
    .get(getProduct)
    // PUT /api/products/:id (Cập nhật sản phẩm)
    .put(authMiddleware.isAuthorized, authMiddleware.authorizeRoles(['admin', 'seller']), updateProduct)
    // DELETE /api/products/:id (Xóa sản phẩm)
    .delete(authMiddleware.isAuthorized, authMiddleware.authorizeRoles(['admin']), deleteProduct);

export const productRoute = router;