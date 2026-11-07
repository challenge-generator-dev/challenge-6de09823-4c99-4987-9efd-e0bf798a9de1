import { IsString, IsNumber, IsEnum, IsUUID, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export class Order {
    @ApiProperty({
        description: 'Identificador único de la orden',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsUUID()
    id: string;

    @ApiProperty({
        description: 'Estado actual de la orden',
        enum: OrderStatus,
        example: OrderStatus.PENDING
    })
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @ApiProperty({
        description: 'Detalles del producto asociado a la orden',
        example: 'Laptop XYZ'
    })
    @IsString()
    productDetails: string;

    @ApiProperty({
        description: 'Cantidad del producto',
        example: 2
    })
    @IsNumber()
    quantity: number;

    @ApiProperty({
        description: 'Precio unitario del producto',
        example: 999.99
    })
    @IsNumber()
    unitPrice: number;

    @ApiProperty({
        description: 'Fecha de creación de la orden',
        example: '2023-10-15T12:00:00.000Z'
    })
    @IsDate()
    createdAt: Date;

    @ApiProperty({
        description: 'Fecha de última actualización de la orden',
        example: '2023-10-15T12:00:00.000Z'
    })
    @IsDate()
    updatedAt: Date;

    constructor(
        id: string,
        status: OrderStatus,
        productDetails: string,
        quantity: number,
        unitPrice: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.status = status;
        this.productDetails = productDetails;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}