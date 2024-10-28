import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/db.json');
      const data = await response.json();
      setCategories(data.categories);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

 
    if (!id || !name || !category || !quantity || !price || !dateAdded) {
      setMessage('Tất cả các trường đều phải nhập.');
      return;
    }

  
    const idPattern = /^PROD-\d{4}$/;
    if (!idPattern.test(id)) {
      setMessage('Mã sản phẩm phải đúng định dạng PROD-XXXX.');
      return;
    }

   
    if (parseInt(quantity) <= 0 || isNaN(quantity)) {
      setMessage('Số lượng sản phẩm phải là số nguyên lớn hơn 0.');
      return;
    }

 
    const today = new Date();
    const enteredDate = new Date(dateAdded);
    if (enteredDate > today) {
      setMessage('Ngày nhập sản phẩm không được lớn hơn ngày hiện tại.');
      return;
    }

  
    const newProduct = {
      id,
      name,
      category,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      dateAdded,
    };

   
    try {
      const response = await fetch('/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setMessage('Thêm sản phẩm thành công!');
        
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setMessage('Lỗi khi thêm sản phẩm.');
      }
    } catch (error) {
      setMessage('Có lỗi xảy ra: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Thêm Sản Phẩm Mới</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mã sản phẩm:</label>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        </div>
        <div>
          <label>Tên sản phẩm:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Thể loại:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Chọn thể loại</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Số lượng:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div>
          <label>Giá:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Ngày nhập:</label>
          <input type="date" value={dateAdded} onChange={(e) => setDateAdded(e.target.value)} required />
        </div>
        <button type="submit">Thêm Sản Phẩm</button>
      </form>
    </div>
  );
};

export default AddProduct;
