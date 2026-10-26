const SUPABASE_URL = "https://vufryjehklpfyalkbhhe.supabase.co";
const SUPABASE_KEY = "sb_publishable_kIXy3Noz783jM5RnaFyBJg_317PLJ6-";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

    if (error) {

        alert(error.message);

        return;
    }

    window.location.href = "index.html";
}
