FROM mongo:4.4 
EXPOSE 27017
CMD ["mongod", "--replSet", "rs0", "--bind_ip_all"]
