#!/bin/sh
# 從 UI設計同仁的 Design Project 更新 css 至指定品牌的專案

# 配置到當前路徑，組員在這邊需更改為自己專案的路徑
DESIGN_PROJECT=/Users/lukelin/Project/Design
PROJECT=/Users/lukelin/Project/ailab-mobile

# 目前既有品牌
SITE_LIST=(NOVA88 GOAL123 BWING)


# READ
echo "選擇品牌"
for i in ${SITE_LIST[@]}
do
  echo "$i \c"
done
echo ",ex: NOVA88 GOAL123 // 更新兩個品牌，中間用空白鍵分隔、大小寫不拘"
read -p ": " site
siteList=($(echo "$site" | tr ' ' '\n'))


# Update
for site in ${siteList[@]}
do
designPath="${DESIGN_PROJECT}/$site/H5/public/css"
projectPath="${PROJECT}/apps/$site/src/styles"
if [ $site = "NOVA88" ] || [ $site = "nova88" ]
then
    projectPath="${PROJECT}/apps/nova88v2/src/styles"
fi
    cp -R ${designPath} ${projectPath}
done

# --
