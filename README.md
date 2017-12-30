# gulp-timemanager
Simple time manager for gulp

Helps to evaluate the time spent on development.



<ol>
    <li>
        First step - initialization:
        <br>
        <code>
            gulp.task('timer', function(cb) {
                timer().init();
                cb();
            });
        </code>
    </li>    
    <li>
        Second step - Start count:
        <br>
        <code>
            gulp.watch([path]).on("change", timer().count);
        </code>
    </li>
</ol>
Example of gulpfile.js you can see <a href="https://github.com/lBeJIuk/frontend_builder">here</a> 
