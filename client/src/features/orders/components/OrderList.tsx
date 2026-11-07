import { useEffect, useState } from 'react';
import { Order } from '../types/order';
import { useOrders } from '../hooks/useOrders';
import { OrderForm } from './OrderForm';
import { CreateOrderDto, UpdateOrderDto, OrderStatus } from '../types/order';

interface OrderListProps {
  refreshTrigger?: number;
}

export function OrderList({ refreshTrigger }: OrderListProps) {
  const {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    clearError,
  } = useOrders();

  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, refreshTrigger]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleCreate = async (data: CreateOrderDto | UpdateOrderDto) => {
    const result = await createOrder(data as CreateOrderDto);
    if (result) {
      setShowForm(false);
    }
  };

  const handleUpdate = async (data: CreateOrderDto | UpdateOrderDto) => {
    if (!editingOrder) return;
    const result = await updateOrder(editingOrder.id, data as UpdateOrderDto);
    if (result) {
      setEditingOrder(null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteOrder(id);
    setDeleteConfirm(null);
  };

  const getStatusClass = (status: OrderStatus): string => {
    const classes: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'status-pending',
      [OrderStatus.PROCESSING]: 'status-processing',
      [OrderStatus.COMPLETED]: 'status-completed',
      [OrderStatus.CANCELLED]: 'status-cancelled',
    };
    return classes[status] || '';
  };

  const getStatusLabel = (status: OrderStatus): string => {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'Pendiente',
      [OrderStatus.PROCESSING]: 'Procesando',
      [OrderStatus.COMPLETED]: 'Completado',
      [OrderStatus.CANCELLED]: 'Cancelado',
    };
    return labels[status] || status;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading && orders.length === 0) {
    return (
      <div className="order-list-loading">
        <div className="spinner" />
        <p>Cargando órdenes...</p>
      </div>
    );
  }

  return (
    <div className="order-list-container">
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={clearError} className="alert-close">×</button>
        </div>
      )}

      <div className="order-list-header">
        <h2>Gestión de Órdenes</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingOrder(null);
          }}
          className="btn-primary"
          disabled={showForm}
        >
          + Nueva Orden
        </button>
      </div>

      {showForm && (
        <div className="order-form-modal">
          <div className="modal-content">
            <h3>Nueva Orden</h3>
            <OrderForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
              isLoading={loading}
            />
          </div>
        </div>
      )}

      {editingOrder && (
        <div className="order-form-modal">
          <div className="modal-content">
            <h3>Editar Orden</h3>
            <OrderForm
              order={editingOrder}
              onSubmit={handleUpdate}
              onCancel={() => setEditingOrder(null)}
              isLoading={loading}
            />
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="order-list-empty">
          <p>No hay órdenes registradas</p>
          <p>Crea tu primera orden haciendo clic en el botón superior</p>
        </div>
      ) : (
        <div className="order-table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="order-id">{order.id.substring(0, 8)}...</td>
                  <td>
                    <div className="customer-info">
                      <span className="customer-name">{order.customerName}</span>
                      <span className="customer-email">{order.customerEmail}</span>
                    </div>
                  </td>
                  <td>{order.productName}</td>
                  <td className="text-center">{order.quantity}</td>
                  <td className="text-right">{formatCurrency(order.price * order.quantity)}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="text-right">{formatDate(order.createdAt)}</td>
                  <td className="actions-cell">
                    <button
                      onClick={() => setEditingOrder(order)}
                      className="btn-icon btn-edit"
                      title="Editar orden"
                      disabled={showForm}
                    >
                      ✏️
                    </button>
                    {deleteConfirm === order.id ? (
                      <div className="delete-confirm">
                        <span>¿Confirmar?</span>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="btn-icon btn-danger"
                          disabled={loading}
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="btn-icon"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(order.id)}
                        className="btn-icon btn-delete"
                        title="Eliminar orden"
                        disabled={showForm}
                      >
                        🗑️
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loading && orders.length > 0 && (
        <div className="loading-overlay">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
}