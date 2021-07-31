const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/test',
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get('/', (req, res) => {
  console.log(req.session);
  if (req.session.viewCount) {
    req.session.viewCount += 1;
  } else {
    req.session.viewCount = 1;
  }

  console.log(req.session);

  res.send(`<h1>Hello World (sessions) ${req.session.viewCount}</h1>`);
});

app.listen(3000, console.log(`Server running on port 3000`));
