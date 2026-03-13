const express = require('express');
const oracledb = require('oracledb');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const app = express();
app.use(express.json());

const dbConfig = { user: "SYSTEM", password: "YOUR_PASSWORD", connectString: "localhost/XE" };


app.post('/add-task', async (req, res) => {
    let conn = await oracledb.getConnection(dbConfig);
    const { task, email, time } = req.body;

    await conn.execute(
        `INSERT INTO todo_list (task_desc, notify_email, start_time) 
         VALUES (:1, TO_TIMESTAMP(:2, 'YYYY-MM-DD"T"HH24:MI'), :3)`,
        [task, email, time]
    );
    await conn.commit();
    await conn.close();
    res.send({ status: "Task Saved in Oracle!" });
});


cron.schedule('* * * * *', async () => {
    let conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
        `SELECT id, task_desc, notify_email FROM todo_list 
         WHERE start_time <= SYSTIMESTAMP + INTERVAL '10' MINUTE 
         AND notified = 0`
    );

    // [Logic to send email via Nodemailer goes here]
    
    await conn.close();
});

app.listen(3000, () => console.log("Server active on http://localhost:3000"));