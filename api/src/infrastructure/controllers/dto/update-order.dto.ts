import { IsString, IsEnum, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../../../domain/entities/order.entity';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Estado actual de la orden',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: 'El estado debe ser uno de: PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED',
  })
  status?: OrderStatus;

  @ApiPropertyOptional({
    description: 'Identificador del producto ordenado',
    example: 'prod_12345',
  })
  @IsOptional()
  @IsString({ message: 'El identificador del producto debe ser texto' })
  productId?: string;

  @ApiPropertyOptional({
    description: 'Nombre del producto ordenado',
    example: 'Laptop Pro 15"',
  })
  @IsOptional()
  @IsString({ message: 'El nombre del producto debe ser texto' })
  productName?: string;

  @ApiPropertyOptional({
    description: 'Cantidad de unidades del producto',
    example: 2,
    minimum: 1,
    maximum: 9999,
  })
  @IsOptional()
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @Min(1, { message: 'La cantidad mínima es 1' })
  @Max(9999, { message: 'La cantidad máxima es 9999' })
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Precio unitario del producto',
    example: 1299.99,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  unitPrice?: number;

  @ApiPropertyOptional({
    description: 'Identificador del cliente que realiza la orden',
    example: 'cust_67890',
  })
  @IsOptional()
  @IsString({ message: 'El identificador del cliente debe ser texto' })
  customerId?: string;

  @ApiPropertyOptional({
    description: 'Dirección de envío del pedido',
    example: 'Av. Principal 123, Ciudad, País',
  })
  @IsOptional()
  @IsString({ message: 'La dirección de envío debe ser texto' })
  shippingAddress?: string;

  @ApiPropertyOptional({
    description: 'Notas adicionales para la orden',
    example: 'Por favor entregar en horario matutino',
  })
  @IsOptional()
  @IsString({ message: 'Las notas deben ser texto' })
  notes?: string;
}