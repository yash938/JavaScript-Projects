let notes = JSON.parse(localStorage.getItem("notes")) || [];

function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("active");
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function addNote() {
  const note = {
    id: Date.now(),
    title: "Untitled Note",
    content: "",
    date: new Date().toISOString(),
  };
  notes.unshift(note);
  saveNotes();
  renderNotes();
  document.querySelector(`#note-${note.id} .note-title`).focus();
}

function updateNote(id, title, content) {
  const note = notes.find((note) => note.id === id);
  if (note) {
    note.title = title;
    note.content = content;
    note.date = new Date().toISOString();
    saveNotes();
  }
}

function deleteNote(id) {
  if (confirm("Are you sure you want to delete this note?")) {
    notes = notes.filter((note) => note.id !== id);
    saveNotes();
    renderNotes();
  }
}

function renderNotes() {
  const notesGrid = document.getElementById("notesGrid");
  notesGrid.innerHTML = "";

  if (notes.length === 0) {
    notesGrid.innerHTML = `
                    <div class="empty-state">
                        <h2>No notes yet</h2>
                        <p>Click the "New Note" button to create your first note!</p>
                    </div>
                `;
    return;
  }

  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.id = `note-${note.id}`;
    noteElement.innerHTML = `
                    <input type="text" class="note-title" value="${note.title}" 
                        onchange="updateNote(${
                          note.id
                        }, this.value, this.nextElementSibling.value)">
                    <textarea class="note-content" 
                        onchange="updateNote(${
                          note.id
                        }, this.previousElementSibling.value, this.value)">${
      note.content
    }</textarea>
                    <div class="note-footer">
                        <span class="note-date">Last edited ${formatDate(
                          note.date
                        )}</span>
                        <div class="note-actions">
                            <button class="action-btn" onclick="deleteNote(${
                              note.id
                            })">Delete</button>
                        </div>
                    </div>
                `;
    notesGrid.appendChild(noteElement);
  });
}

function searchNotes(query) {
  const searchTerm = query.toLowerCase();
  const noteElements = document.querySelectorAll(".note");

  noteElements.forEach((noteEl) => {
    const title = noteEl.querySelector(".note-title").value.toLowerCase();
    const content = noteEl.querySelector(".note-content").value.toLowerCase();
    const isVisible =
      title.includes(searchTerm) || content.includes(searchTerm);
    noteEl.style.display = isVisible ? "block" : "none";
  });
}

document.querySelector(".search-input").addEventListener("input", (e) => {
  searchNotes(e.target.value);
});

renderNotes();
