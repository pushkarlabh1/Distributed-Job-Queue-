const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // List of allowed origins
    const allowedOrigins = [
      'https://job-queue-frontend.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
      process.env.FRONTEND_URL
    ].filter(Boolean); // Remove any undefined/null values from the array

    // Check if origin is in allowed list
    const isAllowed = allowedOrigins.includes(origin);
    callback(null, isAllowed);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie'],
  optionsSuccessStatus: 200
};

export default { corsOptions };