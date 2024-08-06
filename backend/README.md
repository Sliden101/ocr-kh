docker build -f Dockerfile.dev -t sliden101:ocr-kh-backend .


docker run -d -it –-rm -p 6969:6969 –name ocr-kh-backend 