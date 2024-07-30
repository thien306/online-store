import React, { useState } from 'react';

const SearchOrder = () => {
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState([]);

  const handleSearch = () => {
    fetch(`http://localhost:5000/orders?productName_like=${query}`)
      .then(response => response.json())
      .then(data => setOrders(data));
  };

  return (
    <div>
      <h2>Tìm kiếm đơn hàng</h2>
      <input
        type="text"
        placeholder="Tên sản phẩm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Tìm kiếm</button>
      <div>
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              {order.productName} - {order.purchaseDate} - {order.total} USD
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchOrder;
