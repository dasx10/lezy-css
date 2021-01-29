# lezy-css
Splitting media queries and lazy loading in parts from a viewport

We strongly recommend that you take a critical css approach and then use lazy loading of the styles that the console will prompt you.

This approach also works very well with http2.

Which sometimes allows you to achieve an increase in the rendering speed of more than 2 times.
## install 
```
npm i lezy-css
```

## use

example

Create file and write operation
```
const lezyCss = require('lezy-css');

lezyCss('style.css','./dist');
```

params
```
first - input file
second - output result
```

Then a split style folder will be created. Console will tell you how to use it. 

If an error occurred while uploading files, pay attention to the paths.