import { useState, useEffect, FormEvent } from 'react';
import { Order, CreateOrderDto, UpdateOrderDto, OrderStatus } from '../types/order';

interface OrderFormProps {
  order?: Order | null;
  onSubmit: (data: CreateOrderDto | UpdateOrderDto) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

const INITIAL_FORM_STATE: CreateOrderDto = {
  customerName: '',
  customerEmail: '',
  productName: '',
  quantity: 1,
  price: 0,
  status: OrderStatus.PENDING,
};

export function OrderForm({ order, onSubmit, onCancel, isLoading = false }: OrderFormProps) {
  const [formData, setFormData] = useState<CreateOrderDto>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        productName: order.productName,
        quantity: order.quantity,
        price: order.price,
        status: order.status,
      });
    } else {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [order]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'El nombre del cliente es obligatorio';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'El correo del cliente es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'El correo electrónico no es válido';
    }

    if (!formData.productName.trim()) {
      newErrors.productName = 'El nombre del producto es obligatorio';
    }

    if (formData.quantity < 1) {
      newErrors.quantity = 'La cantidad debe ser al menos 1';
    }

    if (formData.price < 0) {
      newErrors.price = 'El precio no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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

  return (
    <form onSubmit={handleSubmit} className="order-form" noValidate>
      <div className="form-group">
        <label htmlFor="customerName">Nombre del Cliente</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.customerName ? 'input-error' : ''}
        />
        {errors.customerName && <span className="error-message">{errors.customerName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="customerEmail">Correo del Cliente</label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.customerEmail ? 'input-error' : ''}
        />
        {errors.customerEmail && <span className="error-message">{errors.customerEmail}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="productName">Producto</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.productName ? 'input-error' : ''}
        />
        {errors.productName && <span className="error-message">{errors.productName}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="quantity">Cantidad</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            disabled={isLoading}
            className={errors.quantity ? 'input-error' : ''}
          />
          {errors.quantity && <span className="error-message">{errors.quantity}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            disabled={isLoading}
            className={errors.price ? 'input-error' : ''}
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={isLoading}
        >
          {Object.values(OrderStatus).map(status => (
            <option key={status} value={status}>
              {getStatusLabel(status)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? 'Guardando...' : order ? 'Actualizar Orden' : 'Crear Orden'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={isLoading} className="btn-secondary">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}