var gulp = require("gulp")
var nodemon = require("gulp-nodemon");
var jsFiles = ["*.js", "src/**/*.js"];
var gulpMocha = require("gulp-mocha");

gulp.task("default", function () {
    var options = {
        script: "app.js",
        delayTime: 1,
        env: {
            PORT: 3000
        },
        ignore: ["./node_modules/**"],
        watch: jsFiles
    }

    return nodemon(options)
        .on("restart", function () {
            console.log("Restarting....  ");
        });
});

gulp.task("test", function () {
    gulp.src("tests/*.js", {
            read: false
        })
        .pipe(gulpMocha({
            reposter: "nyan"
        }))
});