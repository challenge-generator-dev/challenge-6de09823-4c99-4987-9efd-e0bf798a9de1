import { useState, useCallback } from 'react';
import { Order, CreateOrderDto, UpdateOrderDto } from '../types/order';
import { orderService } from '../services/order.service';

interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  createOrder: (data: CreateOrderDto) => Promise<Order | null>;
  updateOrder: (id: string, data: UpdateOrderDto) => Promise<Order | null>;
  deleteOrder: (id: string) => Promise<boolean>;
  clearError: () => void;
}

export function useOrders(): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderService.getAll();
      setOrders(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al obtener las órdenes';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (data: CreateOrderDto): Promise<Order | null> => {
    setLoading(true);
    setError(null);
    try {
      const newOrder = await orderService.create(data);
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear la orden';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrder = useCallback(async (id: string, data: UpdateOrderDto): Promise<Order | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedOrder = await orderService.update(id, data);
      setOrders(prev => prev.map(order => order.id === id ? updatedOrder : order));
      return updatedOrder;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar la orden';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteOrder = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await orderService.delete(id);
      setOrders(prev => prev.filter(order => order.id !== id));
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar la orden';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    clearError,
  };
}