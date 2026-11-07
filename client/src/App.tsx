import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OrderList } from '@/features/orders/components/OrderList';
import { OrderForm } from '@/features/orders/components/OrderForm';
import '@/index.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOrderCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <h1>Gestión de Órdenes</h1>
          <nav className="app-nav">
            <a href="/orders">Órdenes</a>
            <a href="/orders/new">Nueva Orden</a>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route
              path="/orders"
              element={<OrderList key={refreshKey} />}
            />
            <Route
              path="/orders/new"
              element={<OrderForm onSuccess={handleOrderCreated} />}
            />
            <Route
              path="/orders/:id/edit"
              element={<OrderForm onSuccess={handleOrderCreated} />}
            />
            <Route path="/" element={<Navigate to="/orders" replace />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>Sistema de Gestión de Órdenes - DynamoDB</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;