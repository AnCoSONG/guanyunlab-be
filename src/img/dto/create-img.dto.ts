import { ApiProperty } from "@nestjs/swagger";

export class CreateImgDto {
    @ApiProperty({ description: '图像标识', example: 'alt'})
    alt: string;

    @ApiProperty({description: '图像url', example: 'https://dummyimage.com/2400x1600/ff0000/ffffff&text=Hero1'})
    url: string;
}
