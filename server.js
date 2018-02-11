const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

app.use('/statics', express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log('Unable to log in server.log');
    }
  });
  console.log(log);
  
  next();
})
app.get('/', (req, res) => {
  res.render('home.hbs', {
    welcomeMessage: "Welcome to brand new my homepage",
    pageTitle: "Home Page"
  });
});

app.get('/about', (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    'pageTitle': "My Projects"
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Unable to handle the request"
  });
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});