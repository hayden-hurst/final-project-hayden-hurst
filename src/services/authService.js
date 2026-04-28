import prisma from '../config/prisma.js';

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

export const signupUser = async (name, email, password) => {
  if (!name || !email || !password) {
    throw { status: 400, message: 'All fields required' };
  }

  if (!isValidEmail(email)) {
    throw { status: 400, message: 'Invalid email format' };
  }

  if (!isStrongPassword(password)) {
    throw { status: 400, message: 'Password must be at least 8 characters' };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw { status: 409, message: 'Email already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword }
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw { status: 400, message: 'Email and password required' };
  }

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const isStrongPassword = (password) => {
  return password.length >= 8;
};