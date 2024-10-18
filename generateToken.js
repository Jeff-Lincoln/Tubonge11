// Import the jsonwebtoken library
const jwt = require('jsonwebtoken');

// Load environment variables from .env file if available
require('dotenv').config();

// Use the VideoSDK API key and secret from environment variables
const API_KEY = process.env.VIDEOSDK_API_KEY; // Example: 'a31a5dc8-0621-404e-bb84-ed87a6433ada'
const SECRET = process.env.VIDEOSDK_SECRET_KEY; // Example: '516da5328271d751070e71dbb0ea2d8c208575413ae4d1f8cb1fa127d3b0da66'

// Token options
const options = { 
  expiresIn: '120m', // Token will expire in 120 minutes
  algorithm: 'HS256' // Signing algorithm
};

// Payload for the token
const payload = {
  apikey: API_KEY,
  permissions: ['allow_join'], // Options: 'ask_join' || 'allow_mod'
  version: 2, // Optional version
  roomId: '2kyv-gzay-64pg', // Optional room ID
  participantId: 'lxvdplwt', // Optional participant ID
  roles: ['crawler', 'rtc'], // Optional roles
};

// Generate the token
const token = jwt.sign(payload, SECRET, options);

// Log the generated token to the console
console.log(token);
