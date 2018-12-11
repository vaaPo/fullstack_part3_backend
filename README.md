# fullstack_part3_backend <https://mysterious-fjord-82967.herokuapp.com/>
Backend for:
* <https://fullstackopen.github.io/osa3/> homeworks, see below
* <https://fullstackopen.github.io/osa4/> study material tricks code, see fullstack_part3_frontend and fullstack as well.

## FrontEnd applications bundled  
application | purpose
------------|---------------
PhoneBook   | search, add, delete, change phonenumber
Notes       | add, delete, change importance
Country     | search, drilldown 
temperature | celsius-fahrenheit conversion and boiling AI 

## persons API's 
api              | 
-----------------|------------
/api/persons     | GET, POST, PUT
/api/persons/:id | GET, DELETE

## notes API's 
api              | 
-----------------|----------------
/api/notes       | GET, POST, PUT
/api/notes/:id   | GET, DELETE


## TREE
```
----------------------
TREE for backend
----------------------
.env                    // .gitignored file MONGODB_URI,PORT,TEST_MONGODB_URI,TEST_PORT
.eslintignore           // I need my teachers lint files :)
.eslintrc.js            // configurations for eslintignore
.gitignored             // trying to hide secrets and not to pollute github

├── build				// frontend build for: dev, prod
...
├── controllers
│   ├── notescontroller.js		// notesRouter	 /, /:id get,delete,post,put
│   └── personscontroller.js		// personsRouter /, /:id get,delete,post,put
├── datafiles				// static jsons, these are no more supported in backend
│   ├── Kurssit
│   │   ├── halfstackkurssi.js
│   │   └── nodekurssi.js
│   ├── Notes
│   │   └── notes.js
│   └── PhoneBook
│       └── persons.js
├── index.js				// backend
├── models
│   ├── note.js				// Note,   formatNote
│   └── person.js			// Person, formatPerson
├── mongo.js				// command line argument tricks for Node mongodb testing
├── mongotrials
│   ├── monghw3.12.sh			// .gitignored secrets
│   ├── mongoAddNote.js			// .gitignored 
│   ├── mongoGetNotes.js		// .gitignored
│   └── watchmongo.sh			// .gitignored command line argument example
...
├── package.json			// scripts: start, watch, watchmongo, watchtest, test, lint
...
├── README.md				// you are reading it
├── requests				// Vcode rest tests   
│   ├── api_notes
│   │   ├── broken_header_in_post_note.rest
│   │   ├── delete_note.rest
│   │   ├── get_all_notes.rest
│   │   ├── get_note.rest
│   │   ├── post_note.rest
│   │   └── put_note.rest
│   ├── api_persons
│   │   ├── delete_api_persons_id.rest
│   │   ├── get_api_persons_idnotexist.rest
│   │   ├── get_api_persons_id.rest
│   │   ├── get_api_persons.rest
│   │   ├── get_unknown_endpoint.rest
│   │   ├── post_api_persons.rest
│   │   ├── post_broken_api_persons_1_name_null.rest
│   │   ├── post_broken_api_persons_2_phonenumber_null.rest
│   │   ├── post_broken_api_persons_3_name_missing.rest
│   │   ├── post_broken_api_persons_4_phonenumber_missing.rest
│   │   ├── post_broken_api_persons_5_name_duplicate.rest
│   │   └── put_person.rest
│   └── get_info.rest			//FIXME router?
├── scribe.txt				// visual evidence of some state of hacking
├── tests				// run PART4 jest test examples with: "npm run test" 
│   ├── average.test.js			
│   └── palindrom.test.js
├── tree.txt
└── utils				// utilities .js 
    ├── config.js			// DEV/TEST dotenv .env sourcing for mongoUrl,port
    ├── for_testing.js			// palindrom, average  - used for jest tests
    └── middleware.js			// logger and error like 404 for endpoint requests
-------------

```

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
- [x] PART 4 material tricks adapted and old over engineered code cleaned:
```
 ./controllersrefactored with routers: notesRouter, personsRouter, middleware, jest test, mongodb environments: dev,test,production, configurations 
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
sudo service mongod start
mongo mongodb://127.0.0.1:27017
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
### securing Mongodb
<https://stackoverflow.com/questions/41615574/mongodb-server-has-startup-warnings-access-control-is-not-enabled-for-the-dat>
<https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04>
```
emacs -nw /etc/mongod.conf
                                    security:
                                    authorization: "enabled"

mongo --username adminluser --password adminsppassu --authenticationDatabase admin mongodb://127.0.0.1:27017

> use fullstacktest
> db.createUser(
... {user:"fullstack",
... pwd:"jokinsalasana",
... roles:[{role:"readWrite", db: "fullstacktest" },
... {role:"read", db:"test"}]
... }
... )
Successfully added user: {
        "user" : "fullstack",
        "roles" : [
                {
                        "role" : "readWrite",
                        "db" : "fullstacktest"
                },
                {
                        "role" : "read",
                        "db" : "test"
                }
        ]
}
exit
mongo --username fullstack --password jokinsalasana --authenticationDatabase fullstacktest mongodb://127.0.0.1:27017/fullstacktest
> use fullstacktest
switched to db fullstacktest
> db.movie.insert({"name":"tutorials point"})
WriteResult({ "nInserted" : 1 })
> db.movie.find().pretty()
```
### .env see environment variables for DEV db in mlab and TEST mongodb on localhost:
```
MONGODB_URI=mongodb://someluser:somepassy@somemongodb.mlab.com:21461/some_heroku_spesificname_if_created_via_heroku
PORT=3001
TEST_MONGODB_URI=mongodb://127.0.0.1:27017/fullstacktest
TEST_PORT=3002
```
### Testing with jest
<https://jestjs.io/docs/en/expect.html#content>
```
npm run test
```
for win users
```
npm install --save-dev cross-env
```

