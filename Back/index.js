const express = require('express');
const app = express();
express.static('test.html');
app.use(express.json());
const port = 3000;

app.listen(port, () => { console.log(`Serwer działa na porcie: ${port}`) });
app.get('/', (req, res) => { res.send('Witaj w API!') });

const userRoutes = require('./endpoints/users.js')
app.use('/users', usersRoutes)

// do przeniesienia
app.post('/api/users', async (req, res) => {
  res.status(200).json({ response: await getRecords({ where: { Id: req.body.Id }, table: 'User', include: { Type: true } }) });
});

app.post('/api/userTypes', async (req, res) => {
  res.status(200).json({ response: await getRecords({ where: { Id: req.body.Id }, table: 'UserType' }) });
});

app.post('/api/books', async (req, res) => {
  res.status(200).json({ response: await getRecords({ where: { Id: req.body.Id }, table: 'Book', include: { Author: true, Type: true } }) });
});

app.post('/api/bookTypes', async (req, res) => {
  const database =await getRecords({ where: { Id: req.body.Id }, table: 'BookType' });
  res.status(200).json({ response: database });
});

app.post('/api/authors', async (req, res) => {
  console.log(req.body)
  res.status(200).json({ response: await getRecords({ where: { Id: req.body.Id }, table: 'Author' }) });
});

app.post('/api/borrowedBooks', async (req, res) => {
  res.status(200).json({ response: await getRecords({ where: { Id: req.body.Id }, table: 'BorrowedBook', include: { Book: true, User: true } }) });
});

app.post('/api/filterBooks', async (req, res) => {
  const response = await getRecords({ table: "Book", where: { TypeId: req.body.TypeId, AuthorId: req.body.AuthorId }, include: { Type: true, Author: true } });

  response.length > 0 ?
    res.status(200).json({ reponse: response }) :
    res.status(400).json({ error: "Nie ma takich ksiazek" })
});

app.post('/api/returnBook', async (req, res) => {
  if (!req.body.Id) res.status(400).json({ error: "Musisz podac id wypozyczenia" })

  upsertRecords('BorrowedBook', { Id: req.body.Id, ReturnedAt: req.body.ReturnedDate || new Date.now() });

  res.status(200).json({ reponse: 'Dodano wypozyczenie do bazy danych' })
});

app.post('/api/addUser', async (req, res) => {
  // if (!req.body.Name) res.status(400).json({ error: "Musisz podac imie uzytkownika" });
  // if (!req.body.Surname) res.status(400).json({ error: "Musisz podac Nazwisko uzytkownika" });

  // await upsertSingleRecord('User', req.body) ?
  await upsertRecords('User', req.body) ?
  res.status(200).json({ response : "Udalo sie dodac uzytkownika" }) :
  res.status(400).json({ error : "Nie udalo sie dodac uzytkownika" })

});

app.post('/api/addBorrowedBook', async (req, res) => {
  if (!req.body.UserId) res.status(400).json({ error: "Musisz podac id Usera" })
  if (!req.body.BookId) res.status(400).json({ error: "Musisz podac id Ksiazki" })

  upsertRecords(BorrowedBook, { UserId: req.body.UserId, BookId: req.body.BookId })

  res.status(200).json({ reponse: 'Dodano wypozyczenie do bazy danych' })
});

app.post('/api/query', async (req, res) => {
  req.body.table ?
    res.status(200).json({ reponse: await getRecords({ table: req.body.table, where: req.where }) }) :
    res.status(400).json({ error: 'Musisz podac tablice' })
});

// serwer http
const http = require('http');
http.createServer((req, res) => {
  res.write("OK");
  res.end();
}).listen(3000);
//TODO
//create validation
// add automatic include in getRecords
// add faborite logic