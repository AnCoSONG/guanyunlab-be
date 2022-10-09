import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({
    description: '列表页头像',
    example: 'https://dummyimage.com/600x600/f2f2f2/141414&text=Avatar',
  })
  avatar: string;

  @ApiProperty({
    description: '详情页头像',
    example: 'https://dummyimage.com/600x600/f2f2f2/141414&text=HeroAvatar',
  })
  hero_avatar: string;

  @ApiProperty({ description: '中文名', example: '陶冶' })
  cn_name: string;

  @ApiProperty({ description: '英文名', example: 'Ye Tao' })
  en_name: string;

  @ApiProperty({ description: '中文头衔', example: '副教授' })
  cn_title: string;

  @ApiProperty({ description: '英文头衔', example: 'Associate Professor' })
  en_title: string;

  @ApiProperty({
    description: '超文本',
    example:
      '<p>TAO Ye is an Associate Professor and researcher of industrial design at Zhejiang University City College. Her research revolves around the intersection of computational design, digital fabrication, human craft and natural science, and applies that knowledge to design new interactive entities or interfaces. Her goal is to wise apply technology, enhance multi-sensory and achieve better value by employing design principles inspired or engineered by Nature, Beauty and Mercy. Areas of application include product design, as well as digital design and fabrication.</p><p>浙大城市学院工业设计系副教授，杭州市西湖学者。卡内基梅隆大学人机交互系访问学者，浙江大学工业设计系博士后。</p><p>研究交织于数字化设计、数字化制造、人文手工艺等领域，秉承整合“真”“美”“善”的设计原则，发明面向现代设计与制造的新型交互产品及界面。主持国家自然科学基金青年基金项目，研究成果在CHI、UIST、CSCW、UbiComp、TEI等人机交互设计领域顶级学术会议上发表，已获得授权发明专利9项。设计作品已获得红点、iF等国内外设计奖项20余项。</p><hr/><h1>Publications / 论文</h1><ul><li>You W, Jiang H, Yang Z, et al. Automatic synthesis of advertising images according to a specified style[J]. Frontiers of Information Technology & Electronic Engineering, 2020: 1-12.</li><li>You W T, Sun L Y, Yang Z Y, et al. Automatic advertising image color design incorporating a visual color analyzer[J]. Journal of Computer Languages, 2019, 55: 100910.</li></ul><hr/><h1>Awards / 获奖</h1><ul><li>电子折纸启发的产品设计教育套件，中国好设计创意奖，中国创新设计产业战略联盟，2019</li></ul><hr/><h1>Connect / 联系方式</h1><ul><li>Email: taoye@zucc.edu.cn</li><li>Web: http://taoye.me/</li></ul>',
  })
  hypertext: string;
}
