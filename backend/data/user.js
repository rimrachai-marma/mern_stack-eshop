const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12345678', 10),
    gender: 'Male',
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    gender: 'Male',
    password: bcrypt.hashSync('12345678', 10)
  },
  {
    name: 'Natasha',
    email: 'natasha@example.com',
    gender: 'Female',
    password: bcrypt.hashSync('12345678', 10)
  }
];

module.exports = users;
