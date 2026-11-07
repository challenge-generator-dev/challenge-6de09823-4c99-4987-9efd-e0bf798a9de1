import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../../domain/entities/order.entity';

export class CreateOrderDto {
    @ApiProperty({
        description: 'Estado inicial de la orden',
        enum: OrderStatus,
        example: OrderStatus.PENDING
    })
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;

    @ApiProperty({
        description: 'Detalles del producto asociado a la orden',
        example: 'Laptop XYZ'
    })
    @IsString()
    @IsNotEmpty()
    productDetails: string;

    @ApiProperty({
        description: 'Cantidad del producto',
        example: 2
    })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({
        description: 'Precio unitario del producto',
        example: 999.99
    })
    @IsNumber()
    @IsNotEmpty()
    unitPrice: number;
}