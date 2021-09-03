FROM php:7.4-apache

LABEL maintainer="Caitlin Harshberger"

#Set the working directory in the image 
WORKDIR /var/www/html

#Copy my public folder to the working directory
COPY public .