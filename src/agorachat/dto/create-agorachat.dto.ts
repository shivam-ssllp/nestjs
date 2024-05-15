import { ApiProperty } from "@nestjs/swagger";

export class CreateAgorachatDto {
    @ApiProperty({ type: String, required: true })
    uuid: string
}
