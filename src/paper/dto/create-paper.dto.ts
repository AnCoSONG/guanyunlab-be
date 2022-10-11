import { ApiProperty } from '@nestjs/swagger';

export class CreatePaperDto {
  @ApiProperty({
    description: '论文图片',
    example: 'https://dummyimage.com/600x400/000/ffffff&text=Paper',
  })
  img: string;
  @ApiProperty({
    description: '论文作者',
    example:
      'Guanyun Wang, Fang Qin, Haolin Liu, Ye Tao, Yang Zhang, Yongjie Jessica Zhang, Lining Yao',
  })
  authors: string;
  @ApiProperty({
    description: '论文标题',
    example:
      'MorphingCircuit: An Integrated Design, Simulation, and Fabrication Workflow for Self-morphing Electronics',
  })
  title: string;

  @ApiProperty({
    description: '论文发表地址',
    example:
      'Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous TechnologiesVolume 4Issue 4December 2020 Article No.: 157pp 1–26',
  })
  venue: string;

  @ApiProperty({
    description: '论文发表链接',
    example: 'https://dl.acm.org/doi/10.1145/3526212',
  })
  href: string;
}
