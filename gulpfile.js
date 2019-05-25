"use strict";

const gulp = require("gulp"),
	rename = require("gulp-rename"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	order = require("gulp-order"),
	sass = require("gulp-sass"),
	taskListing = require("gulp-task-listing"),
	sourcemaps = require("gulp-sourcemaps"),
	watch = require("gulp-watch"),
	yargs = require("yargs"),
	bump = require("gulp-bump"),
	expect = require("gulp-expect-file"),
	clean = require("gulp-clean"),
	install = require("gulp-install"),
	php = require("gulp-connect-php"),
	babel = require("gulp-babel"),
	bowerFiles = require("bower-files"),
	eslint = require('gulp-eslint'),
	sassLint = require('gulp-sass-lint');

// Library JS files (un-minified preferred for better sourcemaps)
const jsLib = bowerFiles().ext("js").relative(__dirname).files;
// Project JS source files
const jsSource = [
	"html/js/app.js",
	"html/js/fastDirectives.js"
];
// Library CSS files
// const cssLib = [
// ];

// Project SASS source files to be watched with gulp-watch
const sassSource = [
	"html/stylesheets/*.scss",
	"html/stylesheets/**/*.scss"
];
// SASS script defining imports, used to compile
const sassImport = "html/stylesheets/style.scss";
// Package manager files to be watched with gulp-watch
const installSource = [
	"package.json",
	"bower.json"
];
// Package manager configuration
const installConfig = {
	commands: {
		"package.json": "npm",
		"bower.json": "bower"
	}
};
// Location of built files
const build = "html/production";
const jsBuild = `${build}/js`;
const cssBuild = `${build}/css`;
// List of files to be committed upon publish
const publishSource = [
	`${jsBuild}/lib.js`,
	`${jsBuild}/source.js`,
	// `${cssBuild}/lib.css`,
	`${cssBuild}/source.css`
];
const serverPort = 8000;


// Support methods =======================================================

function logError(err) {
	console.log(err);
	gulp.emit("end");
}

function publishError(error) {
	gulp.src([jsBuild, cssBuild])
		.pipe(git.rm({args: "--cached -r -f", quiet: true}));
	console.log(error);
}

function getArgs() {
	return yargs
		.alias("p", "production")
		.alias("v", "version")
		.alias("s", "port")
		.describe("p", "Production flag")
		.describe("v", "Update type (default patch) - major/minor/patch")
		.describe("s", "Port to serve project on")
		.usage("Usage: gulp build [-p <production> [-v <major/minor/patch>] [-s <port>] ] ")
		.argv;
}


// Default task ================================================================

gulp.task("default", taskListing);

// Lint Sass task ================================================================
gulp.task("lint-sass", function () {
  return gulp.src(sassSource)
    .pipe(sassLint({
        configFile: '.sasslintrc'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// ES Lint task ================================================================
gulp.task("es-lint", function () {
  return gulp.src(jsSource)
    .pipe(eslint({
        configFile: '.eslintrc.json'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Build tasks =================================================================
// Accept --production cli argument

gulp.task("start", ["build"], () => gulp.start("serve", "watch", "default") );
gulp.task("build", ["install"], () => gulp.start("build-js", "build-css", "build-version") );
gulp.task("build-js", ["build-js-lib", "build-js-source"]);
gulp.task("build-css", ["build-css-source"]);
// gulp.task("build-css", ["build-css-lib", "build-css-source"]);

gulp.task("build-js-lib", () => {
	const argv = getArgs();
	if (argv.p) // production build with --production
		return gulp
			.src(jsLib)
			.pipe(expect(jsLib))
			.pipe(concat("lib.js"))
			.pipe(uglify({ mangle: false }))
			.on("error", logError)
			.pipe(gulp.dest(jsBuild));
	else // dev build
		return gulp
			.src(jsLib)
			.pipe(expect(jsLib))
			.pipe(sourcemaps.init())
			.pipe(concat("lib.js"))
			.on("error", logError)
			.pipe(sourcemaps.write("./"))
			.pipe(gulp.dest(jsBuild));
});

gulp.task("build-js-source", () => {
	const argv = getArgs();
	if (argv.p) // production build with --production
		return gulp
			.src(jsSource)
			.pipe(expect(jsSource))
			.pipe(order(jsSource))
			.pipe(sourcemaps.init())
			.pipe(concat("source.js"))
			.pipe(babel({ presets: ["es2015"] }))
			.pipe(uglify({ mangle: false }))
			.on("error", logError)
			.pipe(sourcemaps.write("./"))
			.pipe(gulp.dest(jsBuild));
	else // dev build
		return gulp
			.src(jsSource)
			.pipe(expect(jsSource))
			.pipe(order(jsSource))
			.pipe(sourcemaps.init())
			.pipe(concat("source.js"))
			.on("error", logError)
			.pipe(sourcemaps.write("./"))
			.pipe(gulp.dest(jsBuild));
});

// gulp.task("build-css-lib", () => {
// 	const argv = getArgs();
// 	if (argv.p) // production build with --production
// 		return gulp
// 			.src(cssLib)
// 			.pipe(expect(cssLib))
// 			.pipe(concat("lib.css"))
// 			.pipe(gulp.dest(cssBuild));
// 	else // dev build
// 		return gulp
// 			.src(cssLib)
// 			.pipe(expect(cssLib))
// 			.pipe(concat("lib.css"))
// 			.pipe(sourcemaps.init())
// 			.pipe(sourcemaps.write("./"))
// 			.pipe(gulp.dest(cssBuild));
// });

gulp.task("build-css-source", () => {
	const argv = getArgs();
	if (argv.p) // production build with --production
		return gulp
			.src(sassImport)
			.pipe(expect(sassImport))
			.pipe(rename("source.css"))
			.pipe(sass())
			.on("error", logError)
			.pipe(gulp.dest(cssBuild));
	else // dev build
		return gulp
			.src(sassImport)
			.pipe(expect(sassImport))
			.pipe(rename("source.css"))
			.pipe(sourcemaps.init())
			.pipe(sass())
			.on("error", logError)
			.pipe(sourcemaps.write("./"))
			.pipe(gulp.dest(cssBuild));
});

gulp.task("build-version", () => {
	const argv = getArgs();
	if (argv.p) { // production build with --production (only runs with -p flag)
		let versionType = "patch";
		if (argv.v && (argv.v === "major" || argv.v === "minor" || argv.v === "patch"))
			versionType = argv.v;
		return gulp
			.src("package.json")
			.pipe(bump({ type: versionType }))
			.pipe(gulp.dest("./"));
	}
});


// Task for removing build files ===============================================
// Removes html/production

gulp.task("clean", () => {
	return gulp.src(build, { read: false })
		.pipe(clean());
});


// Start php webserver =========================================================

gulp.task("serve", () => {
	const argv = getArgs();
	php.server({
		base: "./html",
		hostname: "localhost",
		port: argv.s ? argv.s : serverPort,
		open: true
	});
});


// Task for updating libraries ================================================

gulp.task("install", () => {
	return gulp.src(installSource)
		.pipe(install(installConfig));
});


// Watch task for Development ==================================================

gulp.task("watch", () => {
	watch(jsLib, () => gulp.start("build-js-lib") );
	watch(jsSource, () => gulp.start("build-js-source") );
	// watch(cssLib, () => gulp.start("build-css-lib") );
	watch(sassSource, () => gulp.start("build-css-source") );
	watch(installSource, () => gulp.start("install") );
});


// Publish task for committing to repo =========================================
// Commits a production build bundled with compiled js/sass

gulp.task("publish", ["build-version"], () => {
	gitrev.branch( (activeBranch) => { // get current active branch
		const argv = yargs
		.alias("m", "message")
		.alias("r", "remote")
		.alias("b", "branch")
		.default("r", "origin")
		.default("b", activeBranch)
		.describe("m", "Commit message")
		.describe("r", "Always defaults to \"origin\"")
		.describe("b", "Defaults to active local branch")
		.usage("Usage: $0 publish -m <message> [-r <remote>] [-b <branch>]")
		.demand(["m"])
		.argv;

		gulp.src(publishSource)
		.pipe(git.add({args: "-f", quiet: true}))
		.pipe(git.commit(argv.m))
		.on("error", publishError)
		.on("end", () => {
			gulp.src([jsBuild, cssBuild])
			.pipe(git.rm({args: "--cached -r -f", quiet: true}));
		});
	});
});
