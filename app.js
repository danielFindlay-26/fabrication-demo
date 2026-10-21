const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_ANON_KEY";

const supabaseClient = supabase.createClient(
    https://vufryjehklpfyalkbhhe.supabase.co/rest/v1/,
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1ZnJ5amVoa2xwZnlhbGtiaGhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0Nzk1NTcsImV4cCI6MjEwODA1NTU1N30.B5_CgW589cShaUpoRfga6Jkzkz4clD4xX-UziQht-2I
);

// Load all work orders
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

// Create new work order
async function createWorkOrder() {

    const jobNumber =
        parseInt(document.getElementById("jobNumber").value);

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

// Update status
async function updateStatus(jobNumber) {

    const newStatus =
        document.getElementById(
            `status-${jobNumber}`
        ).value;

    if (!newStatus) {
        alert("Enter a status");
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
        alert("Update failed");
        return;
    }

    loadWorkOrders();
}

// Initial load
loadWorkOrders();
