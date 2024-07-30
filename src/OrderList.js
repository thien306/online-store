import React, { useEffect, useState } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/orders')
      .then(response => response.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div>
      <h2>Danh sách đơn hàng</h2>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã đơn hàng</th>
            <th>Tên sản phẩm</th>
            <th>Giá (USD)</th>
            <th>Loại sản phẩm</th>
            <th>Ngày mua</th>
            <th>Số lượng</th>
            <th>Tổng tiền (USD)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.id}</td>
              <td>{order.productName}</td>
              <td>{order.price}</td>
              <td>{order.type}</td>
              <td>{order.purchaseDate}</td>
              <td>{order.quantity}</td>
              <td>{order.total}</td>
              <td><button>Sửa</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
