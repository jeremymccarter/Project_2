const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create the connection pool
const pool = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: 'root',
    password: '',
    database: 'comments',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// define the query function
async function query(sql, values) {
    const conn = await pool.getConnection();
    try {
        const [rows, fields] = await conn.query(sql, values);
        return rows;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

// test the query function
async function test() {
    const results = await query('SELECT * FROM comments');
    console.log(results);
}

test();

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Route for getting all comments
app.get('/comments', async (req, res) => {
  const sql = 'SELECT * FROM comments ORDER BY created_at DESC';
  const results = await query(sql);
  res.send(results);
});

// Route for submitting a new comment
app.post('/comments', async (req, res) => {
  const { name, comment } = req.body;
  const sql = 'INSERT INTO comments (name, comment) VALUES (?, ?)';
  const values = [name, comment];
  await query(sql, values);
  res.send('Comment submitted successfully!');
});

// Submit form using AJAX
const form = document.getElementById('comment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent default form submission behavior
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value;
  const data = { name, comment };
  const response = await fetch('/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await response.text();
  alert(result);
  form.reset();
  loadComments();
});

// Function to load comments
async function loadComments() {
  const response = await fetch('/comments');
  const comments = await response.json();
  const commentsContainer = document.getElementById('comments-container');
  commentsContainer.innerHTML = '';
  comments.forEach((comment) => {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('bg-gray-100', 'p-4', 'my-4', 'rounded');
    const name = document.createElement('h3');
    name.classList.add('font-bold');
    name.textContent = comment.name;
    commentDiv.appendChild(name);
    const commentText = document.createElement('p');
    commentText.textContent = comment.comment;
    commentDiv.appendChild(commentText);
    const timestamp = document.createElement('p');
    timestamp.classList.add('text-sm', 'text-gray-600');
    timestamp.textContent = new Date(comment.created_at).toLocaleString();
    commentDiv.appendChild(timestamp);
    commentsContainer.appendChild(commentDiv); // fixed syntax error here
  });
}
