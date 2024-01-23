const fs = require('fs');
const path = require('path');

const pathDir = path.join(__dirname);
const pathCopyFile = path.join(__dirname, 'project-dist', 'bundle.css');
const pathFolderStyle = path.join(pathDir, 'styles');
const pathFolderTestStyles = path.join(pathDir, 'test-files');

let contentArray = []


const arrOfStyles = () => {
  fs.readdir(pathFolderStyle, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach((file) => {
      if(path.extname(file) === '.css'){
        fs.readFile(path.join(pathFolderStyle, file),'utf-8', (err, content) => {
          if(err) throw err

          if (path.extname(file) === '.css'){
            contentArray.push(content)
            fs.writeFile(pathCopyFile, contentArray.join('\n'), 'utf-8', (err) => {
              if(err){
                console.log(err);
              }
            })
          } else {
            return
          }

        })
      }
    })
  })
};



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
                fs.readFile(
                  path.join(pathFolderTestStyles, 'styles', file),
                  'utf-8',
                  (err, content) => {
                    if (err) {
                      console.log('error with reading', err);
                    }

                    if (path.extname(file) === '.css') {
                      contentArray.push(content);

                      fs.writeFile(
                        pathCopyFile,
                        contentArray.join('\n'),
                        'utf-8',
                        (err) => {
                          if (err) {
                            console.log(err);
                          }
                        },
                      );
                    } else {
                      return;
                    }
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
arrOfStyles();




