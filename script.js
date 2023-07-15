document.addEventListener('DOMContentLoaded', () => {
})

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
  const overlay = document.querySelector('c-overlay');

  modal.setAttribute('open', 'true');
  overlay.setAttribute('is-modal-open', 'true');
}

function hideOverlay() {
  const overlay = document.querySelector('c-overlay');
  overlay.setAttribute('is-modal-open', 'false');
}
