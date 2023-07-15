document.addEventListener('DOMContentLoaded', () => {
})

function deleteNote(e) {
  const note = e.target.closest('.c-note');
  note.parentNode.removeChild(note);
}

function updatePinnedNotes(count) {
  const app = document.querySelector('c-app');
  const pinnedNotes = app.shadowRoot.querySelector('c-pinned-notes');

  pinnedNotes.setAttribute('count', count);
}
