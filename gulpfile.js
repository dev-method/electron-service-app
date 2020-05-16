const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('components', () =>
    gulp.src('components/screens/dev/*.js')
        .pipe(babel({
            presets: ["@babel/preset-env", "@babel/preset-react"]
        }))
        .pipe(gulp.dest('components/screens/prod'))
);

gulp.task('actions', () =>
    gulp.src('components/actions/dev/*.js')
        .pipe(babel({
            presets: ["@babel/preset-env", "@babel/preset-react"]
        }))
        .pipe(gulp.dest('components/actions/prod'))
);

gulp.task('reducers', () =>
    gulp.src('components/reducers/dev/*.js')
        .pipe(babel({
            presets: ["@babel/preset-env", "@babel/preset-react"]
        }))
        .pipe(gulp.dest('components/reducers/prod'))
);

gulp.task('store', () =>
    gulp.src('components/store/dev/*.js')
        .pipe(babel({
            presets: ["@babel/preset-env", "@babel/preset-react"]
        }))
        .pipe(gulp.dest('components/store/prod'))
);


gulp.task('compile', ['components', 'actions', 'reducers', 'store']);