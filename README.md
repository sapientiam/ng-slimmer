# Automatic grunt process to generate angular projects.

Manage angularJS/SASS projects with `ng-annotation`, `$templateCache`, `wiredep`, uglify and bower dependencies.

Dependencies needed:
======

1. [node](https://nodejs.org)
2. [bower](http://bower.io/)
3. [grunt](http://gruntjs.com/)
4. [sass](http://sass-lang.com/)

Steps to use the process:
======

1. Clone the project
2. Execute `npm install` command from terminal prompt
3. Execute `bower install` command from terminal prompt

Commands (terminal prompt):
======

1. `grunt compile` compile the project in `dist` folder
2. `grunt watch:compile` activate a watcher on `src` folder for the `compile` process.
3. `grunt create-production` create final project in `production` folder from `dist` folder
4. `grunt serve` activate a server to execute the project in `dist` folder

Style sheet written in [SASS](http://sass-lang.com/) language.
