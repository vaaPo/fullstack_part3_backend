const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const modelsnote = require('../models/note');

const initialNotes = [
  {
    content: 'HTML on helppoa',
    important: false
  },
  {
    content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    important: true
  }
];

beforeAll(async () => {
  await modelsnote.Note.remove({});

  let noteObject = new modelsnote.Note(initialNotes[0]);
  await noteObject.save();

  noteObject = new modelsnote.Note(initialNotes[1]);
  await noteObject.save();
});


test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all notes are returned', async () => {
  const response = await api
    .get('/api/notes');

  expect(response.body.length).toBe(initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api
    .get('/api/notes');

  const contents = response.body.map(r => r.content);

  expect(contents).toContain('HTTP-protokollan tärkeimmät metodit ovat GET ja POST');
});
/**
 * Huomaa jälkimmäisen testin ekspektaatio.
 * Komennolla response.body.map(r => r.content) muodostetaan taulukko API:n palauttamien muistiinpanojen sisällöistä.
 * Jestin toContain-ekspektaatiometodilla tarkistetaan että parametrina oleva muistiinpano on kaikkien
 * API:n palauttamien muistiinpanojen joukossa.
 *
 */

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await yksinkertaistaa asynkronisten funktioiden kutsua',
    important: true
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api
    .get('/api/notes');

  const contents = response.body.map(r => r.content);

  expect(response.body.length).toBe(initialNotes.length + 1);
  expect(contents).toContain('async/await yksinkertaistaa asynkronisten funktioiden kutsua');
});

test('kolme on kolme', async () => {
  const response = await api
    .get('/api/notes');
  const kolme=3;
  expect(kolme).toBe(response.body.length);
});


test('note without content is not added ', async () => {
  const newNote = {
    important: true
  };

  const responseBeforePost = await api
    .get('/api/notes');

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400);

  const responseAfterPost = await api
    .get('/api/notes');

  expect(responseAfterPost.body.length).toBe(responseBeforePost.body.length);
});
// see my pull :) https://github.com/fullstackopen/fullstackopen.github.io/pull/93

//materiaalissa   expect(response.body.length).toBe(initialNotes.length);
//expect(response.body.length).toBe(kala);


afterAll(() => {
  server.close();
});
/**
 * Toisella rivillä testi käynnistää backendin ja käärii sen kolmannella rivillä funktion supertest avulla ns. superagent-olioksi.
 * Tämä olio sijoitetaan muuttujaan api ja sen kautta testit voivat tehdä HTTP-pyyntöjä backendiin.
 * Testimetodi tekee HTTP GET -pyynnön osoitteeseen api/notes ja varmistaa,
 * että pyyntöön vastataan statuskoodilla 200 ja että data palautetaan oikeassa muodossa,
 * eli että Content-Type:n arvo on application/json.
 * Testissä on muutama detalji joihin tutustumme vasta hieman myöhemmin tässä osassa.
 * Testikoodin määrittelevä nuolifunktio alkaa sanalla async ja api-oliolle tehtyä metodikutsua edeltää sama await.
 * Teemme ensin muutamia testejä ja tutustumme sen jälkeen async/await-magiaan.
 * Tällä hetkellä niistä ei tarvitse välittää, kaikki toimii kun kirjoitat testimetodit esimerkin mukaan.
 * Async/await-syntaksin käyttö liittyy siihen, että palvelimelle tehtävät pyynnöt ovat asynkronisia operaatioita.
 * Async/await-kikalla saamme pyynnön näyttämään koodin tasolla synkroonisesti toimivalta.
 */
