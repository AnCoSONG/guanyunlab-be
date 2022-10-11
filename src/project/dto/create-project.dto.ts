import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: '项目中文名称', example: '线' })
  cn_name: string;
  @ApiProperty({ description: '项目英文名称', example: 'A Line' })
  en_name: string;
  @ApiProperty({
    description: '项目中文作者',
    example: '王冠云*，陶冶*，Ozguc Bertug Capunaman，Humphrey Yang，姚力宁',
  })
  cn_authors: string;
  @ApiProperty({
    description: '项目英文作者',
    example:
      'Guanyun Wang*, Ye Tao*, Ozguc Bertug Capunaman, Humphrey Yang, Lining Yao',
  })
  en_authors: string;
  @ApiProperty({ description: '项目第一作者', example: 'Guanyun Wang' })
  first_author: string;
  @ApiProperty({
    description: '英文短摘要',
    example:
      'An integrated design, simulation, and fabrication workflow that combines electronic functions with forms through 4D printing, which effectively reduces cost, production time, and e-waste.',
  })
  short_abstract: string;
  @ApiProperty({
    description: '中文摘要',
    example:
      ' 通过4D打印技术，将电子功能与形式有效地结合在一起，从而有效地降低成本、生产时间和电子废弃物。',
  })
  cn_abstract: string;
  @ApiProperty({
    description: '英文摘要',
    example:
      'An integrated design, simulation, and fabrication workflow that combines electronic functions with forms through 4D printing, which effectively reduces cost, production time, and e-waste.',
  })
  en_abstract: string;
  @ApiProperty({ description: '创建时间', example: 'December 2020' })
  create_date: string;

  @ApiProperty({ description: '浏览次数', example: 0 })
  view_count: number;
  @ApiProperty({
    description: '项目占位图',
    example: 'https://dummyimage.com/600x400/000/ffffff&text=Hero',
  })
  hero_img: string;
  @ApiProperty({
    description: '项目富文本',
    example:
      '<h2>Test / 测试</h2><p>方面方面方面</p><b>哈喽</b><hr><h2>Publications / 已发表论文</h2><ul><li><a href="https://www.baidu.com">A-line: 4D Printing Morphing Linear Composite Structures. CHI 2019</a></li></ul><hr><img src="https://dummyimage.com/600x400/000/ffffff&text=Hero1"></img><img src="https://dummyimage.com/800x400/000/ffffff&text=Hero3"></img>',
  })
  hypertext: string;

  @ApiProperty({
    description: '图像',
    example: [
      'https://dummyimage.com/600x400/000/ffffff&text=Hero1',
      'https://dummyimage.com/600x400/000/ffffff&text=Hero2',
      'https://dummyimage.com/600x400/000/ffffff&text=Hero3',
    ],
  })
  imgs: string[];
}
