const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabaseClient = supabase.createClient(
  https://vufryjehklpfyalkbhhe.supabase.co/rest/v1/,
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1ZnJ5amVoa2xwZnlhbGtiaGhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0Nzk1NTcsImV4cCI6MjEwODA1NTU1N30.B5_CgW589cShaUpoRfga6Jkzkz4clD4xX-UziQht-2I
);

async function saveNote() {

    const noteText = document.getElementById("noteInput").value;

    if (!noteText) {
        alert("Please enter a note.");
        return;
    }

    const { error } = await supabaseClient
        .from("notes")
        .insert([
            {
                note: noteText
            }
        ]);

    if (error) {
        console.error(error);
        alert("Error saving note");
        return;
    }

    document.getElementById("noteInput").value = "";

    loadNotes();
}

async function loadNotes() {

    const { data, error } = await supabaseClient
        .from("notes")
        .select("*")
        .order("created_at", {
            ascending: false
        });

    if (error) {
        console.error(error);
        return;
    }

    const list = document.getElementById("notesList");

    list.innerHTML = "";

    data.forEach(note => {

        const li = document.createElement("li");

        li.textContent = note.note;

        list.appendChild(li);

    });
}

loadNotes();