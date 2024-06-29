FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
RUN cat /tmp/myfile.txt >> /var/log/myfile-contents.log
