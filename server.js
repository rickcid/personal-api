var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var location = ['Salt Lake City', 'Phoenix'];
var hobbies = ['Programming', 'Crossfit', 'Music'];
var occupations = ['CEO', 'Global Project Manager', 'Web Developer'];
var creds = ['http://www.bloomberg.com/apps/news?pid=newsarchive&sid=aGpOqsinKEms', 'http://www.bloomberg.com/research/stocks/people/person.asp?personId=196228299&ticker=ARY:CN&previousCapId=876471&previousTitle=EQUINOX%2520EXPLORATION%2520CORP']
var references = ['John', 'Frank', 'Oscar'];
var skills = [
  {
    id: 1,
    name: 'Javascript',
    experience: 'Beginner'
  },
  {
    id: 2,
    name: 'Ruby',
    experience: 'intermediate'
  }
];


app.use(bodyParser());



app.get('/name', function(request, response) {
  response.send({name: 'Rick Cid'});
});

app.get('/location/:id', function(request, response) {
  var id = request.params.id;
    console.log(request.params.id)
  for (var i = 0; i < location.length; i++) {
    if (location[i].id === parseInt(id)) {
      response.send({location: location[i]});
    }
  }
});

app.put('/location/:id', function(request, response) {
  var id = request.params.id;
  for(var i = 0; i < location.length; i++) {
    if (location[i].id === parseInt(id)) {
      location[i] = request.body;
    }
  }
  response.send({skills: skills});
});

app.get('/hobbies', function(request, response) {
  if (request.query.order === 'asc') {
    response.send({hobbies: hobbies.sort()});
  }
  else if (request.query.order === 'desc') {
    response.send({hobbies: hobbies.sort().reverse()});
  }
  else {
    response.send({hobbies: hobbies});
  }
});

app.get('/occupations', function(request, response) {
  if (request.query.order === 'asc') {
    response.send({occupations: occupations.sort()});
  }
  else if (request.query.order === 'desc') {
    response.send({occupations: occupations.sort().reverse()});
  }
  else {
    response.send({occupations: occupations});   
  }
});

app.get('/occupations/latest', function(request, response) {
  var latest = occupations[occupations.length - 1];
  response.send({occupations: latest});
});

app.route('/mentions')
  .get(function(request, response) {
    response.send({cred: creds})
  })
  .post(function(request, response) {
    creds.push(request.body.cred);
    response.send({cred: creds});
  })

app.route('/references')
  .get(function(request, response) {
    response.send({references: references});
  })
  .post(function(request, response) {
    references.push(request.body.references);
    response.send({references: references});
  })

app.route('/skills?experience = intermediate')
  .get(function(request, response) {
  console.log()
  if (request.query === 'intermediate') {
    response.send({skills: skills});
  }    
  })


app.listen(9000);