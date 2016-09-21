var gulp = require("gulp")
var nodemon = require("gulp-nodemon");
var jsFiles = ["*.js", "src/**/*.js"]

gulp.task("default", function () {
    var options = {
        script: "app.js",
        delayTime: 1,
        env: {
            PORT: 8888
        },
        ignore: ["./node_modules/**"],
        watch: jsFiles
    }

    return nodemon(options)
        .on("restat", function (ev) {
            console.log("Restarting....  ");
        });
});