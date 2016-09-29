// 引入组件
var gulp            = require('gulp');
var jshint          = require('gulp-jshint'); // js 代码检查
var sass            = require('gulp-sass'); // 编译sass
var concat          = require('gulp-concat'); // 合并文件
var uglify          = require('gulp-uglify'); // 混淆压缩js代码
var rename          = require('gulp-rename'); // 重命名文件
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var livereload      = require('gulp-livereload');
var imagemin        = require('gulp-imagemin');
var rev             = require('gulp-rev'); //- 对文件名加MD5后缀
var revCollector    = require('gulp-rev-collector'); //- 路径替换

var src = 'src';
var staticDir = 'src/static/';
var distDir = 'dist/static';
var revDir = 'assets'

var config = {
    sass: {
        all: staticDir + '**/*.scss',
        entry: staticDir + 'app.scss'
    },
    js: {
        all: staticDir + '**/*.js',
        components: staticDir + 'js/*.js',
        starter: staticDir + 'app.js'
    },
    file: {
        images: staticDir + '**/*.+(png|jpg|jpeg|gif)',
        fonts: staticDir + '**/*.+(svg|woff|woff2|ttf|eot)',
        html: 'src/pages/*.html'
    }
};

// 检查js脚本
gulp.task('lint', function() {
    gulp.src(config.js.all)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src(config.sass.entry)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write("./maps"))
        .pipe(rev())
        .pipe(gulp.dest(distDir))
        .pipe(rev.manifest({path: 'sass-rev.json'}))
        .pipe(gulp.dest(revDir));
});

// 合并js并混淆。
gulp.task('scripts', function() {
    gulp.src([ config.js.components, config.js.starter])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(distDir))
    .pipe(rev.manifest({path: 'js-rev.json'}))
    .pipe(gulp.dest(revDir));
});

// 压缩图片， 打包字体文件
gulp.task('fileHandle', function () {
    gulp.src(config.file.images)
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest(distDir))
        .pipe(rev.manifest({path: 'images-rev.json'}))
        .pipe(gulp.dest(revDir));

    gulp.src(config.file.fonts)
        .pipe(rev())
        .pipe(gulp.dest(distDir))
        .pipe(rev.manifest({path: 'fonts-rev.json'}))
        .pipe(gulp.dest(revDir));

    // favicon.ico
    gulp.src(src + '/favicon.ico')
        .pipe(gulp.dest('dist'));
});

// 打包html文件
gulp.task('html', function () {
    gulp.src(config.file.html)
        .pipe(gulp.dest('dist'));
});

// 处理html文件中的css，images，js，fonts等文件路径
gulp.task('rev', function() {
    gulp.src([revDir + '/*.json', config.file.html])//- 读取 *.json 文件以及需要进行替换名称的文件
        .pipe(revCollector())                       //- 执行文件内名称的替换
        .pipe(gulp.dest('dist'));                   //- 替换后的文件输出的目录
});

// 监控文件
gulp.task('watch', function() {
    gulp.watch([config.sass.all], ['sass', 'rev']);
    gulp.watch([config.js.all], ['lint', 'scripts', 'rev']);
    gulp.watch([config.file.images, config.file.fonts], ['fileHandle', 'rev']);
    gulp.watch([config.file.html], ['html', 'rev']);
});

// 帮助信息
gulp.task('help', function () {
    console.log("");
    console.log("");
    console.log("   Welcome to use My gulpfile");
    console.log("");
    console.log("   gulp默认按以下任务执行， 每个任务可单独执行( gulp + 任务名 )");
    console.log("");
    console.log("   任务名          备注");
    console.log("   -------------------------------------------");
    console.log("   lint           检查js脚本。");
    console.log("   sass           编译Sass。");
    console.log("   scripts        合并js并混淆。");
    console.log("   fileHandle     压缩图片， 打包字体文件。");
    console.log("   html           打包html文件");
    console.log("   rev            处理html文件中的css，images，js，fonts等文件路径");
    console.log("   watch          监控文件变化。");
    console.log("   -------------------------------------------");
    console.log("   help           帮助文档。");
    console.log("");
    console.log("");
});

// 默认任务
gulp.task('default', ['lint', 'sass', 'scripts', 'fileHandle', 'html', 'rev', 'watch']);