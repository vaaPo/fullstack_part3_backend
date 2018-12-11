# fullstack_part3_backend <https://mysterious-fjord-82967.herokuapp.com/>
Backend for https://fullstackopen.github.io/osa3/ code, see fullstack_part3_frontend and fullstack as well

## Postman api tests <https://documenter.getpostman.com/view/6101672/RzfiGoDa>

## Homeworks covered:
- [x] 3.1 puhelinluettelon backend osa 1 <http://localhost:3001/api/persons>
- [x] 3.2 puhelinluettelon backend osa 2 <http://localhost:3001/info>
- [x] 3.3 puhelinluettelon backend osa 3 <http://localhost:3001/api/persons/3>
- [x] 3.4 puhelinluettelon backend osa 4 : see delete_api_persons_id.rest
- [x] 3.5 puhelinluettelon backend osa 5 : see post_*.rest
- [x] 3.6 puhelinluettelon backend osa 6 : see post_broken_*.rest
- [x] 3.7 puhelinluettelon backend osa 7 : see morgan talking in console
- [x] 3.8 puhelinluettelon backend osa 8 : morgan says: POST /notes {"content":"öh","important":false,"id":5} 200 112 - 3.444 ms
- [x] 3.9 puhelinluettelon backend osa 9 : frontend baseurl's changed in *TAPI.js files <https://github.com/vaaPo/fullstack_part3_frontend>
- [x] 3.10 puhelinluettelon backend osa 10 : deployed backend to Heroku + POSTMAN <https://documenter.getpostman.com/view/6101672/RzfiGoDa>
- [x] 3.11 puhelinluettelo full stack: frontend build added to backend (build.sh) and deployed to Heroku, works also local see code rest tests
- [x] 3.12 tietokanta komentoriviltä : clouded mongodb in mlab (mongo.js) node mongo.js mlabuser mlabpass mlabdb name phonenumber
- [x] 3.13 puhelinluettelo ja tietokanta, osa 1 : GET backend and frontend to use clouded mongodb via developed moongoose TAPI's 
- [x] 3.14* puhelinluettelo ja tietokanta, osa 2 : formatNote converted to moongoose schemas static method <http://mongoosejs.com/docs/guide.html#statics>
- [x] 3.15 puhelinluettelo ja tietokanta, osa 3 : POST person without duplicate checking but with .catch errors
- [x] 3.16 puhelinluettelo ja tietokanta, osa 4 : DELETE person
- [x] 3.17* puhelinluettelo ja tietokanta, osa 5 : PUT person, update phonenumber for DUPLICATE name
- [x] 3.18* puhelinluettelo ja tietokanta, osa 6 : GET api/persons/:id /info + POSTMAN
- [x] 3.19* puhelinluettelo ja tietokanta, osa 7 : POST person, prevent duplicate phonenumbers via API
- [x] 3.20 tietokantaa käyttävä versio internettiin : FULLSTACK to heroku - works also on localhost
- [x] 3.21* eriytetty sovelluskehitys- ja tuotantotietokanta : separated mongodb for dev and prod heroku config:set NODE_ENV=production
- [x] 3.22 lint-konfiguraatio : ESlint in use, .eslintignore .eslintrc.js and VisualStudio code ESlint
```
npm install express --save
npm update
npm install
npm install --save-dev nodemon
npm install morgan
npm install cors --save
npm install dotenv --save
npm install eslint --save-dev
node_modules/.bin/eslint --init
npm install --save-dev jest

```
### Please note that the fullstack application is available also on localhost <http://localhost:3001/>
#### MONGODB_URI environment variable needs to be set
something like this MONGODB_URI=mongodb://l0ser:asd@ds211013288.mlab.com:1112088/asd-nasds


```
npm run watch
```
### Heroku <https://devcenter.heroku.com/articles/heroku-cli>
```
sudo snap install --classic heroku
heroku --version
heroku login -i
heroku create
```
#### deploy - can be done with code as well
```
git add -A
git commit -m "Initiate app."
git push heroku master
```
#### surf to <https://mysterious-fjord-82967.herokuapp.com/notes>
## check logs regularly with
```
heroku logs
heroku logs -t
```
#### fix frontends baseurl to https://mysterious-fjord-82967.herokuapp.com/

# MONGODB via mlab in Heroku
```
heroku addons:create mongolab:sandbox
```
# MOÓNGOOSE <http://mongoosejs.com/index.html>
```
npm install mongoose --save
```


# MONGODB on linux
<https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/>
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
lsb_release -a
for 16.04
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
cat /etc/mongod.conf
sudo service mongod start
sudo tail -f /var/log/mongodb/mongod.log &
sudo service mongod stop
sudo service mongod restart
mongo mongodb://127.0.0.1:27017
```
### mongo shell <https://docs.mongodb.com/manual/mongo/>
## getting started <https://docs.mongodb.com/manual/tutorial/getting-started/>
<https://docs.mongodb.com/manual/reference/sql-comparison/>
```
mongo
db
show dbs
db.myCollection.insertOne( { x: 1 } );
db.myCollection.find().pretty()
db.myCollection.findOne()
db.inventory.insertMany([
   // MongoDB adds the _id field with an ObjectId if _id is not present
   { item: "journal", qty: 25, status: "A",
       size: { h: 14, w: 21, uom: "cm" }, tags: [ "blank", "red" ] },
   { item: "notebook", qty: 50, status: "A",
       size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank" ] },
   { item: "paper", qty: 100, status: "D",
       size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank", "plain" ] },
   { item: "planner", qty: 75, status: "D",
       size: { h: 22.85, w: 30, uom: "cm" }, tags: [ "blank", "red" ] },
   { item: "postcard", qty: 45, status: "A",
       size: { h: 10, w: 15.25, uom: "cm" }, tags: [ "blue" ] }
]);
db.inventory.find().pretty()
db.inventory.find({})
db.inventory.find( { status: "D" } )
db.inventory.find( { size: { h: 14, w: 21, uom: "cm" } } )
db.inventory.find( { "size.uom": "in" } )
db.inventory.find( { tags: "red" } )
db.inventory.find( { tags: ["red", "blank"] } )


```

### Testing with jest
<https://jestjs.io/docs/en/expect.html#content>
```
npm run test
```
