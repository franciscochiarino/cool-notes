document.addEventListener('DOMContentLoaded', () => {
})

function deleteNote(e, id) {
  const note = e.target.closest('.c-note');
  note.parentNode.removeChild(note);

  const notes = JSON.parse(localStorage.getItem('notes'));
  const noteIndex = notes.findIndex(note => note.id === id);
  notes.splice(noteIndex, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function updateNoteGroups(notes) {
  const app = document.querySelector('c-app');
  const pinnedNotes = app.shadowRoot.querySelector('c-note-group[group="pinned"]');
  const otherNotes = app.shadowRoot.querySelector('c-note-group[group="other"]');
  const pinnedNotesCount = notes.filter(note => note.pinned === 'true').length;
  const otherNotesCount = notes.filter(note => note.pinned === 'false').length;

  pinnedNotes.setAttribute('count', pinnedNotesCount);
  otherNotes.setAttribute('count', otherNotesCount);
}

function openModal() {
  const app = document.querySelector('c-app');
  const modal = app.shadowRoot.querySelector('c-modal');

  modal.setAttribute('open', 'true');
}
