const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const users = [];
let transactions = [];
let balance = 10000;

// Create user API
app.post('/api/createUser', (req, res) => {
  const { first_name, last_name, email, password, phone_number } = req.body;

  if (!first_name || !last_name || !email || !password || !phone_number) {
    return res.status(400).json({
      success: false,
      message: 'Missing required arguments'
    });
  }

  if (phone_number.length !== 10) {
    return res.status(400).json({
      success: false,
      message: 'Phone number must be equal to 10 characters'
    });
  }

  const user = {
    id: users.length + 1,
    first_name,
    last_name,
    email,
    password,
    phone_number
  };

  users.push(user);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    id: user.id
  });
});

// Deposit API
app.post('/api/deposit', (req, res) => {
  try {
    const { user_id, amount } = req.body;
    const user = users.find(u => u.id === user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }
    if(amount >100000) {
        return res.status(400).json({success: false, message: 'Amount should be less than 100000'})
    }
    user.balance = (user.balance || 0) + amount;
    transactions.push({ type: 'deposit', user_id, amount });
    res.json({ success: true, message: `Deposited ${amount} successfully`, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Withdraw API
app.post('/api/withdraw', (req, res) => {
  const { amount } = req.body;
  if(!amount){
    res.status(400).json({ success: false, message: 'Invalid request' });
  }
  if (amount > 0 && balance >= amount) {
    balance -= amount;
    res.json({ success: true, message: `Withdrawn ${amount} successfully` });
  } else {
    res.status(400).json({ success: false, message: 'Insufficient balance or invalid amount' });
  }
});

// get balance api
app.get('/api/get_balance', (req, res) => {
  const user_id = parseInt(req.query.user_id);
  const user = users.find(u => u.id === user_id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.json({ success: true, balance: user.balance });
});

// Send API
app.post('/api/send', (req, res) => {
  const { sender_id, recipient_id, amount } = req.body;
  const sender = users.find(u => u.id === sender_id);
  const recipient = users.find(u => u.id === recipient_id);
  if (!sender) {
    return res.status(404).json({ success: false, message: 'Sender not found' });
  }
  if (!recipient) {
    return res.status(404).json({ success: false, message: 'Recipient not found' });
  }
  if (amount > 0 && sender.balance >= amount) {
    sender.balance -= amount;
    recipient.balance = (recipient.balance || 0) + amount;
    res.json({ success: true, message: `Sent ${amount} to ${recipient.first_name} ${recipient.last_name} successfully` });
  } else {
    res.status(400).json({ success: false, message: 'Insufficient balance or invalid amount' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
