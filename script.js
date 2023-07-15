document.addEventListener('DOMContentLoaded', () => {
})

function deleteNote(e) {
  const note = e.target.closest('.c-note');
  note.parentNode.removeChild(note);
}
