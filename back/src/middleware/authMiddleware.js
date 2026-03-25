const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
      req.user = decoded; 
      next();
    } catch (error) {
      console.error('Auth token failed validation', error);
      res.status(401).json({ message: 'No autorizado, token fallido o expirado' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No autorizado, no hay token provisto' });
  }
};

module.exports = { protect };
