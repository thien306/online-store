import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useState({
        startDate: '',
        endDate: '',
        productId: ''
    });
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [message, setMessage] = useState('');
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    useEffect(() => {
        axios.all([
            axios.get('http://localhost:3001/orders'),
            axios.get('http://localhost:3001/products')
        ])
            .then(axios.spread((ordersResponse, productsResponse) => {
                setOrders(ordersResponse.data);
                setProducts(productsResponse.data);
            }))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filterOrders = useCallback(() => {
        const { startDate, endDate, productId } = searchParams;

        let filtered = orders;

        if (startDate) {
            filtered = filtered.filter(order => parseDate(order.purchaseDate) >= new Date(startDate));
        }

        if (endDate) {
            filtered = filtered.filter(order => parseDate(order.purchaseDate) <= new Date(endDate));
        }

        if (productId) {
            filtered = filtered.filter(order => order.products.some(product => product.id === productId));
        }

        setFilteredOrders(filtered);
        if (filtered.length === 0) {
            setMessage('No results found');
        } else {
            setMessage('');
        }
    }, [searchParams, orders]);

    useEffect(() => {
        filterOrders();
    }, [filterOrders]); // Chỉ phụ thuộc vào filterOrders

    const handleChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Order List</h1>
            <Link to="/add-order" className="btn btn-primary mb-3">Add New Order</Link>
            <form className="mb-4">
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            id="startDate"
                            type="date"
                            name="startDate"
                            className="form-control"
                            value={searchParams.startDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="endDate">End Date:</label>
<input
                            id="endDate"
                            type="date"
                            name="endDate"
                            className="form-control"
                            value={searchParams.endDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="productId">Product:</label>
                        <select
                            id="productId"
                            name="productId"
                            className="form-control"
                            value={searchParams.productId}
                            onChange={handleChange}
                        >
                            <option value="">Select a product</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>

            {message && <div className="alert alert-info">{message}</div>}

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Order ID</th>
                    <th>Product Name</th>
                    <th>Purchase Date</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                </tr>
                </thead>
                <tbody>
                {filteredOrders.map((order, orderIndex) =>
                    order.products.map((product, productIndex) => (
                        <tr key={`${order.orderId}-${product.productId}`}>
                            <td>{orderIndex + 1}</td>
                            <td>{order.orderId}</td>
                            <td>{product.name}</td>
                            <td>{order.purchaseDate}</td>
                            <td>{product.price}</td>
                            <td>{order.quantity}</td>
                            <td>{order.totalAmount}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;