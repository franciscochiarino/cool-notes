document.addEventListener('DOMContentLoaded', () => {
})

function deleteNote(e) {
  const note = e.target.closest('.cool-note');
  note.parentNode.removeChild(note);
}
