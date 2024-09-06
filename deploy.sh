#!/bin/bash

# 打包项目
pnpm install
pnpm run build

# 打包构建文件
tar -czf dist.tar.gz dist

# 上传构建文件到服务器
scp dist.tar.gz root@47.94.139.189:/root/deploy/ry

# 执行服务器上的部署脚本
ssh root@47.94.139.189 'chmod +x /root/deploy/ry/ry.sh && /root/deploy/ry/ry.sh'
