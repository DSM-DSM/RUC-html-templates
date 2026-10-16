FROM nginx:alpine
RUN echo "www:x:1000:1000:www,,,:/nonexistent:/sbin/nologin" >> /etc/passwd && echo "www:x:1000:" >> /etc/group
