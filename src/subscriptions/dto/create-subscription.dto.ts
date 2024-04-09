import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriptionDto {
    @ApiProperty()
    priceId:string

    @ApiProperty()
    customerId:string
}
