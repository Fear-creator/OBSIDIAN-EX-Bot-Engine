const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const pairRoutes = require('./routes/pairRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pairRoutes);

app.use((req, res) => {
  res.status(404).render('index', {
    pageTitle: 'Page Not Found',
    error: 'Requested page could not be found.'
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).render('index', {
    pageTitle: 'Server Error',
    error: 'An unexpected error occurred. Please try again.'
  });
});

app.listen(PORT, () => {
  console.log(`OBSIDIAN-EX Pair Site running on http://localhost:${PORT}`);
});
