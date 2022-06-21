const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      }
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain  as "password"');
        }
      }
    },
    gender: {
      type: String,
      trim: true,
      enum: {
        values: ['Male', 'Female', 'Custom'],
        message: '{VALUE} is not supported'
      },
      default: 'Custom'
    },
    avatar: {
      type: Buffer
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

//hash and salting password with middleware "Pre Hook"
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//comparing passwoed with static method
userSchema.statics.findByCredentials = async (email, enteredPassword) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(enteredPassword, user.password);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  return user;
};

//generate auth token with instance method
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
