#!/bin/bash

mkdir -p certs

openssl req -x509 -newkey rsa:4096 -keyout certs/key.pem -out certs/cert.pem -days 365 -nodes -subj "/C=RU/ST=Moscow/L=Moscow/O=Development/CN=localhost"

echo "SSL certificates generated in certs/ folder"
echo "You can now access the application at: https://localhost:3000"