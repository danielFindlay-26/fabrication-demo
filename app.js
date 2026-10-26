// ================================
// Supabase Connection
// ================================

const SUPABASE_URL = "https://vufryjehklpfyalkbhhe.supabase.co";
const SUPABASE_KEY = "sb_publishable_kIXy3Noz783jM5RnaFyBJg_317PLJ6-";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
checkLogin();

async function checkLogin() {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    if (!session) {

        window.location.href = "login.html";

        return;
    }

}

//=======
// Logout function

async function logout() {

    await supabaseClient.auth.signOut();

    window.location.href = "login.html";
}
// ================================
// Load Work Orders
// ================================

async function loadWorkOrders() {

    const { data, error } = await supabaseClient
        .from("work_orders")
        .select("*")
        .order("job_number");

    if (error) {
        console.error(error);
        alert("Error loading work orders");
        return;
    }

    const tbody = document.querySelector(
        "#workOrdersTable tbody"
    );

    tbody.innerHTML = "";

    data.forEach(order => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.job_number}</td>
            <td>${order.description}</td>
            <td>${order.status}</td>
            <td>
                <input
                    type="text"
                    id="status-${order.job_number}"
                    placeholder="New Status"
                >
                <button
                    onclick="updateStatus(${order.job_number})"
                >
                    Update
                </button>
            </td>
        `;

        tbody.appendChild(row);

    });

}

// ================================
// Create Work Order
// ================================

async function createWorkOrder() {

    const jobNumber = parseInt(
        document.getElementById("jobNumber").value
    );

    const description =
        document.getElementById("description").value;

    const status =
        document.getElementById("status").value;

    if (!jobNumber || !description || !status) {

        alert("Please complete all fields");

        return;
    }

    const { error } = await supabaseClient
        .from("work_orders")
        .insert([
            {
                job_number: jobNumber,
                description: description,
                status: status
            }
        ]);

    if (error) {

        console.error(error);

        alert("Error creating work order");

        return;
    }

    alert("Work Order Created");

    document.getElementById("jobNumber").value = "";
    document.getElementById("description").value = "";
    document.getElementById("status").value = "";

    loadWorkOrders();

}

// ================================
// Update Status
// ================================

async function updateStatus(jobNumber) {

    const newStatus = document.getElementById(
        `status-${jobNumber}`
    ).value;

    if (!newStatus) {

        alert("Please enter a new status");

        return;
    }

    const { error } = await supabaseClient
        .from("work_orders")
        .update({
            status: newStatus
        })
        .eq("job_number", jobNumber);

    if (error) {

        console.error(error);

        alert("Status update failed");

        return;
    }

    alert("Status Updated");

    loadWorkOrders();

}

// ================================
// Initial Page Load
// ================================

loadWorkOrders();
