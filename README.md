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


