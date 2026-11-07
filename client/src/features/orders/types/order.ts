export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  customerId: string;
  customerName: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  items?: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

export function calculateOrderTotal(items: CreateOrderDto['items']): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function createOrderItem(
  productId: string,
  productName: string,
  quantity: number,
  unitPrice: number
): OrderItem {
  return {
    productId,
    productName,
    quantity,
    unitPrice,
    subtotal: quantity * unitPrice,
  };
}

export function validateOrderData(data: CreateOrderDto): string[] {
  const errors: string[] = [];
  
  if (!data.customerId || data.customerId.trim() === '') {
    errors.push('El ID del cliente es requerido');
  }
  
  if (!data.customerName || data.customerName.trim() === '') {
    errors.push('El nombre del cliente es requerido');
  }
  
  if (!data.items || data.items.length === 0) {
    errors.push('La orden debe tener al menos un producto');
  }
  
  data.items.forEach((item, index) => {
    if (!item.productId) {
      errors.push(`Producto ${index + 1}: ID requerido`);
    }
    if (!item.productName) {
      errors.push(`Producto ${index + 1}: nombre requerido`);
    }
    if (item.quantity <= 0) {
      errors.push(`Producto ${index + 1}: cantidad debe ser mayor a 0`);
    }
    if (item.unitPrice <= 0) {
      errors.push(`Producto ${index + 1}: precio debe ser mayor a 0`);
    }
  });
  
  return errors;
}

export function isValidOrderStatus(status: string): status is OrderStatus {
  return ['pending', 'processing', 'completed', 'cancelled'].includes(status);
}

export function formatOrderDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    pending: 'Pendiente',
    processing: 'Procesando',
    completed: 'Completada',
    cancelled: 'Cancelada',
  };
  return labels[status];
}

export function getStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    pending: '#FFA500',
    processing: '#4169E1',
    completed: '#228B22',
    cancelled: '#DC143C',
  };
  return colors[status];
}