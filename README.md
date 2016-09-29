# gulp 开发传统页面脚手架

    功能如下：
    1. 压缩css
    2. 给css添加厂商前缀
    3. 压缩并混淆js
    4. 压缩图片，打包字体文件
    5. 处理html中的css, images, js, fonts文件，使之文件名使用md5形式。
    6. gulp help 帮助文档命令
    
## 安装

```shell
-> git clone git@github.com:jaeheng/gulp-page-starter.git
-> npm install
```

## 任务列表
|----------|-----------------------------------------------|
|任务名     |     备注 |
|lint      |     检查js脚本。|
|sass      |     编译Sass。|
|scripts   |    合并js并混淆。|
|fileHandle|     压缩图片， 打包字体文件。|
|html      |    打包html文件|
|rev       |    处理html文件中的css，images，js，fonts等文件路径|
|watch     |     监控文件变化。|
|help      |     帮助文档。|

    
    one piece , I'll definitely get it