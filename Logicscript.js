async function saveTask() {
    const data = {
        task: document.getElementById('task').value,
        email: document.getElementById('email').value,
        time: document.getElementById('time').value
    };

    const response = await fetch('http://localhost:3000/add-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.status);
}