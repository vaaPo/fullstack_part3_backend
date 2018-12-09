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
- [] 3.12 tietokanta komentoriviltä : clouded mongodb in mlab (mongo.js)
- [] 3.13 puhelinluettelo ja tietokanta, osa 1 : GET backend and frontend to use clouded mongodb via developed moongoose TAPI's 
- [] 3.14* puhelinluettelo ja tietokanta, osa 2 : formatNote converted to moongoose schemas static method <http://mongoosejs.com/docs/guide.html#statics>
- [] 3.15 puhelinluettelo ja tietokanta, osa 3 : POST person without duplicate checking but with .catch errors
- [] 3.16 puhelinluettelo ja tietokanta, osa 4 : DELETE person
- [] 3.17* puhelinluettelo ja tietokanta, osa 5 : PUT person, update phonenumber for DUPLICATE name
- [] 3.18* puhelinluettelo ja tietokanta, osa 6 : GET api/persons/:id /info + POSTMAN
- [] 3.19* puhelinluettelo ja tietokanta, osa 7 : POST person, prevent duplicate phonenumbers via API
- [] 3.20 tietokantaa käyttävä versio internettiin : FULLSTACK to heroku - works also on localhost
- [] 3.21* eriytetty sovelluskehitys- ja tuotantotietokanta : separated mongodb for dev and prod
- [] 3.22 lint-konfiguraatio : ESlint in use
```
npm install express --save
npm update
npm install
npm install --save-dev nodemon
npm install morgan
npm install cors --save
```
### Please note that the fullstack application is available also on localhost <http://localhost:3001/>
```
npm run watch
```
### Heroku <https://devcenter.heroku.com/articles/heroku-cli>
'''
sudo snap install --classic heroku
heroku --version
heroku login -i
heroku create
'''
#### deploy - can be done with code as well
'''
git add -A
git commit -m "Initiate app."
git push heroku master
'''
#### surf to <https://mysterious-fjord-82967.herokuapp.com/notes>
'''
heroku logs
heroku logs -t
'''
#### fix frontends baseurl to https://mysterious-fjord-82967.herokuapp.com/


