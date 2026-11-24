import { ApiProperty } from '@nestjs/swagger';

export class CreateMetadatumDto {
  @ApiProperty({
    description: '关于大图',
    example: ['https://www.baidu.com/img/bd_logo1.png'],
  })
  about_heros: string[];
  @ApiProperty({
    description: '联系富文本',
    example: '<h2>Test / 测试</h2><p>方面方面方面</p><b>哈喽</b><hr>',
  })
  contact_hypertext: string;
}
