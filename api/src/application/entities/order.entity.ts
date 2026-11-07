export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export class Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    customerId: string;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    shippingAddress: OrderAddress;
    billingAddress: OrderAddress;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;
    this.customerId = data.customerId;
    this.items = data.items;
    this.totalAmount = data.totalAmount;
    this.status = data.status;
    this.shippingAddress = data.shippingAddress;
    this.billingAddress = data.billingAddress;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }

  canBeModified(): boolean {
    return this.status === OrderStatus.PENDING || this.status === OrderStatus.CONFIRMED;
  }

  canBeCancelled(): boolean {
    return this.status !== OrderStatus.DELIVERED && this.status !== OrderStatus.CANCELLED;
  }

  isValid(): boolean {
    if (!this.customerId || this.customerId.trim() === '') {
      return false;
    }
    if (!this.items || this.items.length === 0) {
      return false;
    }
    if (this.items.some(item => item.quantity <= 0 || item.unitPrice < 0)) {
      return false;
    }
    return true;
  }

  toJSON() {
    return {
      id: this.id,
      customerId: this.customerId,
      items: this.items,
      totalAmount: this.totalAmount,
      status: this.status,
      shippingAddress: this.shippingAddress,
      billingAddress: this.billingAddress,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}