import * as authService from '../services/authService.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.signupUser(
      name,
      email,
      password
    );

    res.status(201).json({
      message: 'User created',
      user
    });

  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || 'Server error'
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await authService.loginUser(
      email,
      password
    );

    res.json({ token });

  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || 'Server error'
    });
  }
};