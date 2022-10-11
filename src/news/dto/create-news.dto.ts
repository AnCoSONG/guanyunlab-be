import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({
    description: '新闻标题',
    example: 'xlab Showcase 2022 “Interverse of Things” （2022.2.10-16）',
  })
  title: string;
  @ApiProperty({
    description: '新闻富文本',
    example: `<p>这是一篇案例文章。</p>
    <h1>标题1</h1>
    <h2>标题2</h2>
    <h3>标题3</h3>
    <p><hr></p>
    <p>可以插入图片：</p>
    <p><img src="https://i.imgur.com/ZyQhdiM.jpg"></p>
    <p><hr></p>
    <p>可以插入动图：</p>
    <p><img src="https://media0.giphy.com/media/DrJm6F9poo4aA/giphy.gif?cid=a51c33e68dcyf1hn43b63tu08lhbozcfdphwcdtqc6xc1i3i&amp;rid=giphy.gif&amp;ct=g"></p>
    <hr>
    <p>可以插入Youtube视频：</p>
    <iframe width="500" height="315" src="https://www.youtube.com/embed/ISk80iLhdfU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
  })
  hypertext: string;
}
