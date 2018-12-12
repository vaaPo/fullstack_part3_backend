const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
//const Note = require('../models/note');
const modelsnote = require('../models/note');
const { format, initialNotes, nonExistingId, notesInDb } = require('./test_helper');

describe('when there is initially some notes saved', async () => {
  beforeAll(async () => {
    await modelsnote.Note.remove({});

    const noteObjects = initialNotes.map(n => new modelsnote.Note(n));
    await Promise.all(noteObjects.map(n => n.save()));
  });

  test('all notes are returned as json by GET /api/notes', async () => {
    const notesInDatabase = await notesInDb();

    const response = await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.length).toBe(notesInDatabase.length);

    const returnedContents = response.body.map(n => n.content);
    notesInDatabase.forEach(note => {
      expect(returnedContents).toContain(note.content);
    });
  });

  test('individual notes are returned as json by GET /api/notes/:id', async () => {
    const notesInDatabase = await notesInDb();
    const aNote = notesInDatabase[0];

    const response = await api
      .get(`/api/notes/${aNote.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.content).toBe(aNote.content);
  });

  test('404 returned by GET /api/notes/:id with nonexisting valid id', async () => {
    const validNonexistingId = await nonExistingId();

    const response = await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404);
  });

  test('400 is returned by GET /api/notes/:id with invalid id', async () => {
    const invalidId = '[]5a3d5da59070081a82a3445kissankakkaa';

    const response = await api
      .get(`/api/notes/${invalidId}`)
      .expect(400);
  });

  describe('addition of a new modelsnote.Note', async () => {

    test('POST /api/notes succeeds with valid data', async () => {
      const notesAtStart = await notesInDb();

      const newNote = {
        content: 'async/await yksinkertaistaa asynkronisten funktioiden kutsua',
        important: true
      };

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const notesAfterOperation = await notesInDb();

      expect(notesAfterOperation.length).toBe(notesAtStart.length + 1);

      const contents = notesAfterOperation.map(r => r.content);
      expect(contents).toContain('async/await yksinkertaistaa asynkronisten funktioiden kutsua');
    });

    test('POST /api/notes fails with proper statuscode if content is missing', async () => {
      const newNote = {
        important: true
      };

      const notesAtStart = await notesInDb();

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400);

      const notesAfterOperation = await notesInDb();

      const contents = notesAfterOperation.map(r => r.content);

      expect(notesAfterOperation.length).toBe(notesAtStart.length);
    });
  });

  describe('deletion of a note', async () => {
    let addedNote;

    beforeAll(async () => {
      addedNote = new modelsnote.Note({
        content: 'poisto pyynnöllä HTTP DELETE',
        important: false
      });
      await addedNote.save();
    });

    test('DELETE /api/notes/:id succeeds with proper statuscode', async () => {
      const notesAtStart = await notesInDb();

      await api
        .delete(`/api/notes/${addedNote._id}`)
        .expect(204);

      const notesAfterOperation = await notesInDb();

      const contents = notesAfterOperation.map(r => r.content);

      expect(contents).not.toContain(addedNote.content);
      expect(notesAfterOperation.length).toBe(notesAtStart.length - 1);
    });
  });

  afterAll(() => {
    server.close();
  });

});
