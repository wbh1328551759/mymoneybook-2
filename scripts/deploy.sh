#!/user/bin/env bash

yarn build &&
cd build &&
git init &&
git add . &&
git commit -m 'deploy' &&
git remote add origin git@github.com:wbh1328551759/MyMoneyBook-2-website.git &&
git push -u master -f
cd -