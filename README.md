# Tasks
Nginx config example
```nginx
server {
    listen 80;
    server_name localhost;

    location / {
      #  frontend build path
      #  root D:/projects/taskList/client/dist/;
      #  index index.html index.htm;
      
      #  frontend dev server
      proxy_pass http://localhost:8080;
    }

    location /api/ {
      # backend server
      proxy_pass http://localhost:4040;
    }

    location /socket.io/ {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_pass http://localhost:4040;
    }
}
```
