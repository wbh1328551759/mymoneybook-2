#!/user/bin/env bash

yarn build &&
cd build &&
git init &&
git add . &&
git commit -m 'deploy' &&
git remote add origin git@gitee.com:wbhchixigua/mymoneybook-2-website.git &&
git push -u origin master -f
cd -