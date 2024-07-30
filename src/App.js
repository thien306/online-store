import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import OrderList from './components/OrderList';
import AddOrder from './components/AddOrder';
import SearchOrder from './components/SearchOrder';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Danh sách đơn hàng</Link></li>
            <li><Link to="/add">Thêm đơn hàng</Link></li>
            <li><Link to="/search">Tìm kiếm đơn hàng</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={OrderList} />
          <Route path="/add" component={AddOrder} />
          <Route path="/search" component={SearchOrder} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
