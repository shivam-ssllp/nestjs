import { ApiProperty } from "@nestjs/swagger";

export enum EOprator {
    ADDTION = "addtion",
    MULTIPLICATION = "multiplication",
    SUBSTRACTION = "substraction",
    DIVISION = "division"
}
export class CreatePracticeDto {
    @ApiProperty({ required: true, enum: EOprator })
    oprator: string

    @ApiProperty({ required: true, default: "" })
    level: string
}
