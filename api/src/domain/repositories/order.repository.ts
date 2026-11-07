import { Order } from '../entities/order.entity';

export interface OrderRepository {
    create(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    update(id: string, order: Partial<Omit<Order, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Order>;
    delete(id: string): Promise<void>;
}