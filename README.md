# 网络安全课程设计 XWALL (FrontEnd)

## Usage

- 使用`Electron`打包生成的`AppImage`文件已放置在[后端仓库](https://github.com/BIIIANG/HUST-CSE-CourseProjectOfNetworkSecurity-2022)相应位置（`gui/xwall-gui-0.1.0.AppImage`），按步骤启动后端即可一并启动该程序。

## Build (Ubuntu 22.04)

```
# 安装 npm 并换源
sudo apt install npm
npm config set registry https://registry.npm.taobao.org

# 安装 n 和 yarn 并换源
sudo npm install -g n
sudo npm install -g yarn
yarn config set registry https://registry.npm.taobao.org
yarn config set electron_mirror https://cdn.npm.taobao.org/dist/electron/

# 安装 nodejs 指定版本
sudo n install 16.13.0

# 
yarn install

# 启动项目
yarn serve

# 打包成 Electron 应用
# 打包过程中会从 Github 下载包，请通过代理等方式确认当前环境可以访问 Github
yarn electron:build
./dist_electron/xwall-gui-0.1.0.AppImage

# 如果运行 APPImage 出错，提示 dlopen(): error loading libfuse.so.2
sudo apt install libfuse2
```



## 启动项目

1. 安装`yarn`：`npm install -g yarn `
2. 安装`vue-cli`：`yarn global add @vue/cli`
3. 安装依赖：`yarn install`
4. 启动项目：`yarn serve`

## 生成桌面程序

上述启动过程中已安装`electron-builder`，运行`yarn electron:serve`即可启动桌面程序。
