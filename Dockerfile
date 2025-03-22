FROM nginx:alpine

# 复制网站文件到Nginx默认目录
COPY . /usr/share/nginx/html/

# 配置Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80 