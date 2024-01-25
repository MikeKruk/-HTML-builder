const fs = require('fs');
const path = require('path');

const pathProjectDist = path.join(__dirname, 'project-dist');
const pathStyleFolder = path.join(__dirname, 'styles');
const pathStyleFile = path.join(pathProjectDist, 'style.css');
const pathAssetsFolder = path.join(__dirname, 'assets');
const components = path.join(__dirname, 'components');
const template = path.join(__dirname, 'template.html');

let arrStyleContent = [];

const replaceContent = () => {
  fs.readFile(template, 'utf-8', (err, code) => {
    fs.readdir(components, (err, files) => {
      if (err) {
        console.log('read item', err);
      }
      let codeContent = code;
      files.forEach((file) => {
        const replaceItem = file.split('.')[0];
        if (path.extname(file) === '.html') {
          fs.readFile(path.join(components, file), 'utf-8', (err, content) => {
            codeContent = codeContent.replaceAll(`{{${replaceItem}}}`, content);
            fs.writeFile(
              path.join(pathProjectDist, 'index.html'),
              codeContent,
              'utf-8',
              (err) => {
                if (err) {
                  console.log('create file', err);
                }
              },
            );
          });
        }
      });
    });
  });
};

const copyStyle = () => {
  fs.readdir(pathStyleFolder, (err, files) => {
    if (err) {
      console.log('read Style', err);
    }
    files.forEach((file) => {
      if (path.extname(file) === '.css')
        fs.readFile(
          path.join(pathStyleFolder, file),
          'utf-8',
          (err, content) => {
            arrStyleContent.push(content);
            fs.writeFile(
              pathStyleFile,
              arrStyleContent.join('\n'),
              'utf-8',
              (err) => {
                if (err) {
                  console.log('write file css', err);
                }
              },
            );
          },
        );
    });
  });
};

const copyAssets = () => {
  fs.mkdir(path.join(pathProjectDist, 'assets'), { recursive: true }, (err) => {
    if (err) {
      console.log('mk folder assets', err);
    }
  });

  fs.readdir(pathAssetsFolder, (err, folders) => {
    if (err) {
      console.log('read assets', err);
    }

    folders.forEach((folder) => {
      fs.readdir(path.join(pathAssetsFolder, folder), (err, files) => {
        if (err) {
          console.log('read assets s folder', err);
        }
        fs.mkdir(
          path.join(pathProjectDist, 'assets', folder),
          { recursive: true },
          (err) => {
            if (err) {
              console.log('mk assets s folders', err);
            }
          },
        );
        fs.readdir(
          path.join(pathProjectDist, 'assets', `${folder}`),
          (err, copyFiles) => {
            copyFiles.forEach((file) => {
              if (!files.includes(file)) {
                fs.unlink(
                  path.join(pathProjectDist, 'assets', folder, file),
                  (err) => {},
                );
              }
            });
          },
        );

        files.forEach((file) => {
          fs.copyFile(
            path.join(pathAssetsFolder, folder, file),
            path.join(path.join(pathProjectDist, 'assets'), folder, file),
            (err) => {
              if (err) {
                console.log('copy file', err);
              }
            },
          );
        });
      });
    });
  });
};

const createProjectDist = () => {
  fs.mkdir(pathProjectDist, { recursive: true }, (err) => {
    if (err) {
      console.log('mk folder', err);
    }
  });
};

const copy = () => {
  createProjectDist();
  copyAssets();
  copyStyle();
  replaceContent();
};

copy();
