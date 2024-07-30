import React, { useState, useEffect } from 'react';

const AddOrder = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    type: '',
    purchaseDate: '',
    quantity: 1
  });

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedProduct = products.find(product => product.name === formData.productName);
    const total = formData.price * formData.quantity;
    const newOrder = { ...formData, type: selectedProduct.type, total };

    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    }).then(response => {
      if (response.ok) {
        alert('Thêm đơn hàng thành công');
        setFormData({
          productName: '',
          price: '',
          type: '',
          purchaseDate: '',
          quantity: 1
        });
      }
    });
  };

  return (
    <div>
      <h2>Thêm đơn hàng mới</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Sản phẩm</label>
          <select name="productName" value={formData.productName} onChange={handleChange} required>
            <option value="">Chọn sản phẩm</option>
            {products.map(product => (
              <option key={product.id} value={product.name}>{product.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Giá (USD)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Ngày mua</label>
          <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Số lượng</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" required />
        </div>
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddOrder;
