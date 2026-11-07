import { apiClient } from '@shared/services/api';
import type {
  Order,
  CreateOrderDto,
  UpdateOrderDto,
  OrderListResponse,
  ApiError,
} from '../types/order';
import { validateOrderData } from '../types/order';

class OrderService {
  private readonly endpoint = '/orders';

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const validationErrors = validateOrderData(data);
    
    if (validationErrors.length > 0) {
      const error = new Error(validationErrors.join(', ')) as Error & { code: string };
      error.code = 'VALIDATION_ERROR';
      throw error;
    }

    try {
      const response = await apiClient.post<Order>(this.endpoint, data);
      return response;
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al crear la orden';
      throw new Error(message);
    }
  }

  async getOrder(id: string): Promise<Order> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de la orden es requerido');
    }

    try {
      const response = await apiClient.get<Order>(`${this.endpoint}/${id}`);
      return response;
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al obtener la orden';
      throw new Error(message);
    }
  }

  async getAllOrders(page: number = 1, pageSize: number = 10): Promise<OrderListResponse> {
    if (page < 1) {
      throw new Error('El número de página debe ser mayor a 0');
    }
    if (pageSize < 1 || pageSize > 100) {
      throw new Error('El tamaño de página debe estar entre 1 y 100');
    }

    try {
      const response = await apiClient.get<OrderListResponse>(
        `${this.endpoint}?page=${page}&pageSize=${pageSize}`
      );
      return response;
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al obtener las órdenes';
      throw new Error(message);
    }
  }

  async updateOrder(id: string, data: UpdateOrderDto): Promise<Order> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de la orden es requerido');
    }

    if (!data || (data.status === undefined && (!data.items || data.items.length === 0))) {
      throw new Error('Debe proporcionar al menos un campo para actualizar');
    }

    try {
      const response = await apiClient.put<Order>(`${this.endpoint}/${id}`, data);
      return response;
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al actualizar la orden';
      throw new Error(message);
    }
  }

  async deleteOrder(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de la orden es requerido');
    }

    try {
      await apiClient.delete<void>(`${this.endpoint}/${id}`);
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al eliminar la orden';
      throw new Error(message);
    }
  }

  async updateOrderStatus(id: string, status: UpdateOrderDto['status']): Promise<Order> {
    if (!status) {
      throw new Error('El estado de la orden es requerido');
    }
    return this.updateOrder(id, { status });
  }

  async getOrdersByCustomer(customerId: string): Promise<Order[]> {
    if (!customerId || customerId.trim() === '') {
      throw new Error('El ID del cliente es requerido');
    }

    try {
      const response = await apiClient.get<Order[]>(
        `${this.endpoint}/customer/${customerId}`
      );
      return response;
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al obtener las órdenes del cliente';
      throw new Error(message);
    }
  }

  async getOrdersByStatus(
    status: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<OrderListResponse> {
    if (!status || status.trim() === '') {
      throw new Error('El estado de la orden es requerido');
    }

    try {
      const response = await apiClient.get<OrderListResponse>(
        `${this.endpoint}/status/${status}?page=${page}&pageSize=${pageSize}`
      );
      return response;
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al filtrar las órdenes por estado';
      throw new Error(message);
    }
  }
}

export const orderService = new OrderService();
export default orderService;