document.addEventListener('DOMContentLoaded', () => {
})

function deleteNote(e) {
  const note = e.target.closest('.c-note');
  note.parentNode.removeChild(note);
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
