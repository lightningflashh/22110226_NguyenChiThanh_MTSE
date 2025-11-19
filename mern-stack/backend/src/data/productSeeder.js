import Product from '../models/productModel.js';

const products = [...Array(50).keys()].map(i => {
    const isEven = i % 2 === 0;
    return {
        name: `Laptop Gaming ABC ${i + 1}`,
        description: `Mô tả chi tiết cho sản phẩm Laptop Gaming ABC thế hệ ${i + 1}.`,
        image: `/images/sample-${i + 1}.jpg`,
        price: 15000000 + (i * 1000000), // Giá tăng dần
        countInStock: isEven ? 10 : 0, // Kiểm tra countInStock
        category: isEven ? 'Laptop' : 'Phụ kiện',
        brand: isEven ? 'Dell' : 'Logitech',
        // Các trường này mặc định là 0 khi tạo, nhưng có thể set để test
        rating: (i % 5) + 1,
        numReviews: i * 2,
    }
});

export const importProducts = async () => {
    try {
        await Product.deleteMany(); // Xóa tất cả product cũ

        // Thêm dữ liệu mẫu (50 sản phẩm)
        await Product.insertMany(products);

        console.log('✅ Dữ liệu Product đã được import thành công!');
    } catch (error) {
        console.error(`❌ Lỗi khi import Product: ${error.message}`);
        process.exit(1);
    }
};

export const destroyProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('🗑️ Dữ liệu Product đã được xóa thành công!');
    } catch (error) {
        console.error(`❌ Lỗi khi xóa Product: ${error.message}`);
        process.exit(1);
    }
};