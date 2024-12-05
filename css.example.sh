#!/bin/sh
# 從 UI設計同仁的 Design Project 更新 css 至指定品牌的專案

# 配置到當前路徑，組員在這邊需更改為自己專案的路徑，絕對或相對皆可
DESIGN_PROJECT=../Design
PROJECT=.

# 目前既有品牌
SITE_LIST=(BWING GOAL123)

# READ
echo "選擇品牌 (中間用空白分隔、大小寫不拘。例: BWING GOAL123)"
for i in ${SITE_LIST[@]}
do
  echo "$i \c"
done
echo ""
read -p ": " site
siteList=($(echo "$site" | tr ' ' '\n'))


# Update
for site in ${siteList[@]}
do
  # css
  designCssPath="${DESIGN_PROJECT}/$site/H5/public/*.scss"
  projectCssPath="${PROJECT}/apps/$site/src/styles/css"

  echo $designCssPath "->" $projectCssPath
  cp -R ${designCssPath} ${projectCssPath}

  # font
  designFontsPath="${DESIGN_PROJECT}/$site/H5/public/fonts"
  projectFontsPath="${PROJECT}/apps/$site/src/styles"

  echo $designFontsPath "->" $projectFontsPath
  cp -R ${designFontsPath} ${projectFontsPath}

  # img
  designImgPath="${DESIGN_PROJECT}/$site/H5/public/img"
  projectImgPath="${PROJECT}/apps/$site/src/styles"
  # 清空 img 目錄確保不會有舊圖片殘留
  rm -rf ${projectImgPath}/img/*
  echo $designImgPath "->" $projectImgPath
  cp -R ${designImgPath} ${projectImgPath}
done

# --
