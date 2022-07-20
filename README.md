# MERN stack eCommerce website.

A fullstack eCommerce website using MERN stack and Redux (with Redux Toolkit) and many more.
[Live View](https://eshop-app-mern-stack.herokuapp.com/)

![screenshot 1](https://github.com/rimrachai-marma/mern_stack-eshop/blob/main/uploads/image-1655908448291.PNG)
![screenshot 2](https://github.com/rimrachai-marma/mern_stack-eshop/blob/main/uploads/image-1655908460139.PNG)
![screenshot 3](https://github.com/rimrachai-marma/mern_stack-eshop/blob/main/uploads/image-1655908469615.PNG)

## Technology

> Thechnologies that used in this project

#### Frontend

- React JS
- React Router v6
- Redux with Redux toolkit
- Pure CSS with SASS (Did not any css framework)
- Axios
- React PayPal JS

#### Backend

- Node JS with express.js
- mongoose
- validator
- bcryptjs
- JWT
- multer
- sharp
- stripe
- @paypal/checkout-server-sdk

## Features

> Full featured with...

- Protected and nested route
- Form validation
- Shopping cart and that save to the backend database when user login.
- Product reviews and ratings
- Product pagination, search, filter, and sorting (in same route)
- User profile with orders and user profile edit
- User profile picture (buffer image) upload with multer
- User Order details page
- Checkout process (shipping, order, payment, etc)
- Payment integration with Paypal and Stripe (secure backend logic)
- Admin product management and image upload with multer
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Database seeder (products & users)

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 8080
MONGO_URL = your mongodb url
JWT_SECRET = your JWT secret  key
PAYPAL_CLIENT_ID = your paypal client id
PAYPAL_CLIENT_SECRET = your paypal client secret id
STRIPE_PRIVATE_KEY = sk_test_4eC39HqLyjWDarjtT1zdp7dc
CLIENT_URL = http://localhost:3000
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:8080)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
12345678

john@example.com (User)
12345678

natasha@example.com (User)
12345678
```

Copyright (c) 2020 Rimrachai Marma
