var gulp = require('gulp');
// 压缩css
var minifycss = require('gulp-clean-css');
//链接
var concat = require('gulp-concat');
//压缩Js
var uglify = require('gulp-uglify');
//压缩图片
var imageMin = require('gulp-imagemin');
var clean = require('gulp-clean');
//less
var less = require('gulp-less');
//MD5重命名
var rev = require("gulp-rev");
//路径替换
var revCollector = require('gulp-rev-collector');
var sequence = require('gulp-sequence');
//先清除
gulp.task('clean', function() {
    return gulp.src(['public/dist/style', 'public/dist/js', 'public/dist/imgages'], { read: false })
        .pipe(clean());
});
//压缩js文件
gulp.task('script', function() {
    //第一步找到文件
    return gulp.src('public/html/js/*.js')
        .pipe(uglify()) //压缩
        .pipe(rev()) //md5命名
        .pipe(gulp.dest('public/dist/js')) //压缩版输出
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/dist/rev/js')) //输出完整版

});
//压缩css文件
gulp.task('css', function() {
    return gulp.src('public/html/style/*.css')
        .pipe(minifycss()) //压缩
        .pipe(rev()) //md5命名
        .pipe(gulp.dest('public/dist/style')) //输出完整版
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/dist/rev/style')) //输出完整版
});

//压缩html
gulp.task('html', function() {
    return gulp.src('public/html/*.html')
        .pipe(gulp.dest('public/dist/')) //压缩版输出

});
//less
gulp.task('less', function() {
    return gulp.src('public/html/style/*.less')
        .pipe(less())
        .pipe(gulp.dest('public/dist/rev/style'));
});
//
gulp.task('rev', function() {
    return gulp.src(['public/dist/rev/**/*.json', 'public/dist/*.html']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector()) //- 执行文件内css名的替换
        .pipe(gulp.dest('public/dist/')); //- 替换后的文件输出的目录
});
// 图片处理任务
gulp.task('img', function() {
    return gulp.src('public/html/images/*')
        .pipe(imageMin({ optimizationLevel: 3, progressive: true, interlaced: true })) //压缩图片
        .pipe(gulp.dest('public/dist/images'))
        // .pipe(notify({ message: '图片处理完成' }));
});
//实时监控文件修改并继续压缩
gulp.task('auto', function() {
    gulp.watch('public/html/js/*.js', ['script']);
    gulp.watch('public/html/style/*.css', ['css']);
    gulp.watch('public/html/images/*', ['img']);
    gulp.watch('public/html/*.html', ['html']);
    gulp.watch('public/dist/rev/**/*.json', ['rev']);
    gulp.watch('public/html/style/*.less', ['less']);

});
//顺序化执行
gulp.task('sequence', sequence('clean', ['script', 'css', 'html','less'], 'rev', 'img', 'auto'));
//执行全部任务
gulp.task('default', ['sequence']);
