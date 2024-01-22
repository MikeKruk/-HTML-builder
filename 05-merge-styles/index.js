const fs = require('fs');
const path = require('path');

const pathDir = path.join(__dirname);
const pathCopyFile = path.join(__dirname, 'project-dist', 'bundle.css');
const pathFolderStyle = path.join(pathDir, 'styles');
const pathFolderTestStyles = path.join(pathDir, 'test-files');
let dataArray = [];


const arrOfStyles = () => {
  fs.readdir(pathDir, (err, data) => {
    if (err) {
      console.log('error with read dir', err);
    }
    let arr = [];
    data.forEach((folder) => {
      if (folder.includes('styles')) {
        fs.readdir(path.join(pathFolderStyle), (err, files) => {
          if (err) {
            console.log('error in second map', err);
          }
          files.forEach((file) => {
            if (file.includes('.css')) {
              arr.push(file);
            }
          });
          console.log(arr);
          return arr;
        });
      }
    });
  });
};

// arrOfStyles()

const arrOfStylesFromTestFiles = () => {
  fs.readdir(pathDir, (err, data) => {
    if (err) {
      console.log('error with read dir', err);
    }
    data.forEach((folder) => {
      if (folder.includes('test-files')) {
        fs.readdir(path.join(pathFolderTestStyles), (err) => {
          if (err) {
            console.log('error in second map', err);
          }
          fs.readdir(
            path.join(pathFolderTestStyles, 'styles'),
            (err, files) => {
              files.forEach((file) => {
                console.log(file);
                fs.readFile(
                  path.join(pathFolderTestStyles, 'styles', file),
                  'utf-8',
                  (err, content) => {
                    if (err) {
                      console.log('error with reading', err);
                    }
                     dataArray.push(content)
                    console.log(dataArray.join(''));
                    console.log(files.length);


                    // fs.writeFile(pathCopyFile, dataa, 'utf-8', (err) => {
                    //   if (err) {
                    //     console.log('error in created file', err);
                    //   }
                    //   console.log('file created');
                    // });
                  },
                );
              });
            },
          );
        });
      }
    });
  });
};

arrOfStylesFromTestFiles();

const copyStyles = () => {
  fs.writeFile(pathCopyFile, data, 'utf-8', (err) => {
    if(err){
      console.log('error in created file', err);
    }
    console.log('file created');
  })
};
// copyStyles();


