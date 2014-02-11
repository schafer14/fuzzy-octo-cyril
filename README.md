Snapstock.au with Node.js
=========================

## Technology stack


| Testing | DB | Backend | Front-end |
| ------------- | ----------- | ----- | -----| ---- |
| Mocha: unit framework BDD  | MySql | Express.js  | Angular.js |
| should.js: assert lib | | Connect | jade |
| tobi js: acceptence | |  | twitter bootstrap |


## Routes
#### GET: '/' 
  - Home page
  - Response types: html.
  
#### GET: '/photos'
  - Returns a list of photos depending on the query string
  - Response types: html, json, xml, rss:?.

#### GET: '/photos/:id'
  - Returns one photo with option to buy
  - Response types: html. 

## Routes for authors

Data options for routes coming soon. 

| GET | PUT | POST | DELETE |
| ------------- | ----------- | ----- | -----| 
| '/users/:id'  | '/users/:id' | '/users'  |  |
| '/collections' | '/collections/:id' | '/collections' | '/collections/:id' |
| '/tags' | | '/tags' |  | 
|  | '/photos/:id' | '/photos' | '/photos/:id' |
 
