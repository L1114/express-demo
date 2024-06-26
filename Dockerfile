
# 基础镜像为 
FROM node

# 容器默认时区为UTC，如需使用上海时间请启用以下时区设置命令
# RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo Asia/Shanghai > /etc/timezone

# 指定工作目录
WORKDIR /app

# 拷贝包管理文件
COPY package*.json /app

# npm 源，选用国内镜像源以提高下载速度
RUN npm config set registry https://registry.npm.taobao.org/

# npm 安装依赖
RUN npm install

# 将当前目录（dockerfile所在目录）下所有文件都拷贝到工作目录下（.gitignore中的文件除外）
COPY . /app

# 执行启动命令.
# 写多行独立的CMD命令是错误写法！只有最后一行CMD命令会被执行，之前的都会被忽略，导致业务报错。
# 请参考[Docker官方文档之CMD命令](https://docs.docker.com/engine/reference/builder/#cmd)
# 执行 package.json 的 scripts 中约定的自定义命令时，格式必须为 CMD ["npm", "run", "命令"]
CMD ["npm", "run", "master"]

