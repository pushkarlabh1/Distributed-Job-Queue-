const corsOptions = {
  origin: function (origin, callback) {
    const allowed = ['https://job-queue-frontend.vercel.app', 'http://localhost:3000', 'http://localhost:5173'];
    if (!origin || allowed.includes(origin)) callback(null, true);
    else callback(new Error('CORS blocked'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
};

export default { corsOptions };