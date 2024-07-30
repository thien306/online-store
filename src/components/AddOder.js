import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddOrder = () => {
    const [products, setProducts] = useState([]);
    const [orderData, setOrderData] = useState({
        orderId: '',
        purchaseDate: '',
        quantity: 1,
        productId: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products from the server
        axios.get('http://localhost:3001/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { orderId, purchaseDate, quantity, productId } = orderData;

        // Validate inputs
        if (!orderId || !purchaseDate || !quantity || !productId) {
            setMessage('All fields are required');
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (purchaseDate > today) {
            setMessage('Purchase date cannot be in the future');
            return;
        }

        if (parseInt(quantity, 10) <= 0) {
            setMessage('Quantity must be a positive integer');
            return;
        }

        // Find selected product
        const selectedProduct = products.find(p => p.id === productId);
        if (!selectedProduct) {
            setMessage('Selected product is invalid');
            return;
        }

        const totalAmount = selectedProduct.price * quantity;

        // Post new order
        axios.post('http://localhost:3001/orders', {
            orderId,
            purchaseDate,
            quantity,
            totalAmount,
            products: [{ ...selectedProduct }]
        })
            .then(() => {
                setMessage('Order added successfully');
                setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
            })
            .catch(error => setMessage('Error adding order:', error));
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Add New Order</h1>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="orderId">Order ID:</label>
                    <input
                        id="orderId"
                        type="text"
                        name="orderId"
                        className="form-control"
                        value={orderData.orderId}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
<label htmlFor="purchaseDate">Purchase Date:</label>
                    <input
                        id="purchaseDate"
                        type="date"
                        name="purchaseDate"
                        className="form-control"
                        value={orderData.purchaseDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productId">Product:</label>
                    <select
                        id="productId"
                        name="productId"
                        className="form-control"
                        value={orderData.productId}
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
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        id="quantity"
                        type="number"
                        name="quantity"
                        className="form-control"
                        value={orderData.quantity}
                        onChange={handleChange}
                        min="1"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Order</button>
            </form>
        </div>

    );
};

export default AddOrder;