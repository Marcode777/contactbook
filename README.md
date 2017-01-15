# contactbook

to use this app, on terminal (this is the first terminal shell), 
open a second terminal shell, 
  run the command: mongod, 
open a third terminal shell, 
  run the command: mongo 
and then back to the first terminal, 
  run the command: node server
app should show up at localhost:3200

improved version of FULLSTANGULAR2


sometimes some of the functions will throw a 500 internal server error, the solution was to update node version by first running the command, sudo npm install n -g, and then the command, sudo n stable