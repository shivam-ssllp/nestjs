import { ApiProperty } from "@nestjs/swagger";

export enum EOprator {
    ADDTION = "addtion",
    MULTIPLICATION = "multiplication",
    SUBSTRACTION = "substraction",
    DIVISION = "division"
}
export class CreateAdvertisementsDto {
    @ApiProperty({ required: true })
    signature: string

    @ApiProperty({ required: true })
    message: string

    @ApiProperty({ required: true })
    wallet_address: string

    @ApiProperty({ required: true })
    image: string

    @ApiProperty({ required: true })
    pixels: Array<{ x: number, y: number }>

}
