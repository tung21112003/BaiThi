import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([
    
        {
            "id": "PROD-0001",
            "name": "Sản phẩm A",
            "description": "Mô tả sản phẩm A",
            "category": "Thể loại 1",
            "price": 100,
            "quantity": 5,
            "dateAdded": "2024-10-25"
          },
          {
            "id": "PROD-0002",
            "name": "Sản phẩm B",
            "description": "Mô tả sản phẩm B",
            "category": "Thể loại 2",
            "price": 150,
            "quantity": 3,
            "dateAdded": "2024-10-26"
          },
          {
            "id": "PROD-0003",
            "name": "Sản phẩm C",
            "description": "Mô tả sản phẩm C",
            "category": "Thể loại 1",
            "price": 200,
            "quantity": 10,
            "dateAdded": "2024-10-27"
          }
    
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/db.json'); 
        const data = await response.json();
        setProducts(data.products); 
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    };

    fetchProducts();
  }, []);

 
  const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <h2>Danh Sách Sản Phẩm</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Thể loại</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Ngày nhập</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{formatDate(product.dateAdded)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
