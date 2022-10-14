import { ApiProperty } from '@nestjs/swagger';

export class CreateMetadatumDto {
  @ApiProperty({
    description: '关于大图',
    example: ['https://www.baidu.com/img/bd_logo1.png'],
  })
  about_heros: string[];
  @ApiProperty({
    description: '招募富文本',
    example: '<h2>Test / 测试</h2><p>方面方面方面</p><b>哈喽</b><hr>',
  })
  recruit_hypertext: string;
  @ApiProperty({
    description: '合作捐赠富文本',
    example: '<h2>Test / 测试</h2><p>方面方面方面</p><b>哈喽</b><hr>',
  })
  collaboration_sponsor_hypertext: string;
  @ApiProperty({
    description: '实验室富文本',
    example: '<h2>Test / 测试</h2><p>方面方面方面</p><b>哈喽</b><hr>',
  })
  lab_office_hypertext: string;
  @ApiProperty({
    description: '联系方式富文本',
    example: '<h2>Test / 测试</h2><p>方面方面方面</p><b>哈喽</b><hr>',
  })
  info_hypertext: string;
}
