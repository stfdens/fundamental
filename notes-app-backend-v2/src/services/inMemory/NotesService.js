const { nanoid } = require('nanoid');
const InvariantError = require('../../excaptions/InvariantError');
const NoteFoundError = require('../../excaptions/NotFoundError');
const ClientError = require('../../excaptions/ClientError');

class NotesService {
    constructor() {
        this._notes = [];
    }

    addNote({ title, body, tags }) {
        const id = nanoid(16)
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newNote = {
            title, tags, body, id, createdAt, updatedAt,
        };

        this._notes.push(newNote);

        const isSuccess = this._notes.filter((note) => note.id === id).length > 0;


        if (!isSuccess) {
            throw new InvariantError('catatan gagal ditambahkan')
        }

        return id;
    };

    getNote() {
        return this._notes;
    };

    getNoteById(id) {
        const note = this._notes.filter((n) => n.id === id)[0];

        if (!note) {
            throw new NoteFoundError('Catatan tidak ditemukan')
        }
        return note;
    };

    editNoteById(id, { title, body, tags }) {
        const index = this._notes.findIndex((note) => note.id === id);

        if (index === -1) {
            throw new ClientError('Gagal memperbarui catatan. Id tidak ditemukan');
        }

        const updatedAt = new Date().toISOString();

        this._notes[index] = {
            ...this._notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
    };

    deleteNoteById(id) {
        const index = this._notes.findIndex((note) => note.id === id);

        if (index === -1) {
            throw new NoteFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }

        this._notes.splice(index, 1);
    };
}

module.exports = NotesService;