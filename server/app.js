var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path'),
    cors = require('cors'),
    Sequelize = require('sequelize'),
    _ = require('lodash');


sequelize = new Sequelize('sqlite://' + path.join(__dirname, 'invoices.sqlite'), {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'poll.sqlite')
});

Question = sequelize.define('questions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: Sequelize.STRING
  }
});

Answer = sequelize.define('answer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  question_id: {
    type: Sequelize.INTEGER
  },
  text: {
    type: Sequelize.STRING
  }
});


UserAnswer = sequelize.define('user_answer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  answer_id: {
    type: Sequelize.INTEGER
  },
  user_email: {
    type: Sequelize.STRING
  }
});

sequelize.sync().then(function() {
  Question.create({
    description: "¿Qué te ha parecido React?"
  })
  .then(q => {
    Answer.create({
      text: "Demasiado complicado :(",
      question_id: q.id
    });

    Answer.create({
      text: "Prefiero [insertar framework js de preferencia]",
      question_id: q.id
    });

    Answer.create({
      text: "Está bueno",
      question_id: q.id
    });

    Answer.create({
      text: "Mind = blown",
      question_id: q.id
    });
  });


}).catch(function(e) {
  console.log("ERROR SYNCING WITH DB", e);
});

var app = module.exports = express();
app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// QUESTIONS API

app.route('/api/questions')
  .get(function(req, res) {
    Question.findAll().then(function(questions) {
      res.json(questions);
    })
  })
  .post(function(req, res) {
    var question = Question.build(_.pick(req.body, ['description']));
    question.save().then(function(question){
      res.json(question);
    });
  });

app.route('/api/questions/:question_id')
  .get(function(req, res) {
    Question.findById(req.params.question_id).then(function(question) {
      if (!question) {
        return res.status(404).send('Not found');
      }
      res.json(question);
    });
  })
  .put(function(req, res) {
    Question.findById(req.params.question_id).then(function(question) {
      if (!question) {
        return res.status(404).send('Not found');
      }
      question.update(_.pick(req.body, ['description'])).then(function(question) {
        res.json(question);
      });
    });
  })
  .delete(function(req, res) {
    Question.findById(req.params.question_id).then(function(question) {
      if (!question) {
        return res.status(404).send('Not found');
      }
      question.destroy().then(function(question) {
        res.json(question);
      });
    });
  });


// QUESTION ANSWERS API

app.route('/api/questions/:question_id/answers')
  .get(function(req, res) {
    Answer.findAll({where: { question_id: req.params.question_id }}).then(function(question_answers) {
      res.json(question_answers);
    })
  })
  .post(function(req, res) {
    var answer = Answer.build(_.pick(req.body, ['text']));
    answer.set('question_id', req.params.question_id);
    answer.save().then(function(answer){
      res.json(answer);
    });
  });


app.route('/api/questions/:question_id/answers/:answer_id')
  .get(function(req, res) {
    Answer.findById(req.params.answer_id).then(function(answer) {
      if (!answer) {
        return res.status(404).send('Not found');
      }
      res.json(answer);
    });
  })
  .put(function(req, res) {
    Answer.findById(req.params.answer_id).then(function(answer) {
      if (!answer) {
        return res.status(404).send('Not found');
      }
      answer.update(_.pick(req.body, ['question_id', 'text'])).then(function(answer) {
        res.json(answer);
      });
    });
  })
  .delete(function(req, res) {
    Answer.findById(req.params.answer_id).then(function(answer) {
      if (!answer) {
        return res.status(404).send('Not found');
      }
      answer.destroy().then(function(answer) {
        res.json(answer);
      });
    });
  });

app.route('/api/questions/:question_id/answers/:answer_id/response')
  .post(function(req, res) {
    var user_answer = UserAnswer.build(_.pick(req.body, ['user_email']));
    user_answer.set('answer_id', req.params.answer_id);
    user_answer.save().then(function(user_answer){
      res.json(user_answer);
    });
  });



// Redirect all non api requests to the index
/*app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

// Starting express server
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});