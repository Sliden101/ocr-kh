sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt


docker build -f Dockerfile.dev -t sliden101:ocr-kh-backend .


docker run -d -p 6969:6969 
docker run -p 6969:6969 –name ocr-kh-backend 



