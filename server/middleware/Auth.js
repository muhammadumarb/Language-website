const jwt = require('jsonwebtoken');
exports.Auth = (req,res,next) => {
  try {
    const header = req.headers.authorization || '';
    const bearer = header.startsWith('Bearer ') ? header.slice(7) : null;
    const token = bearer || req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ mess:'Authentication required' });
    req.user = jwt.verify(token, bearer ? process.env.Access_TOKEN : process.env.REFRESH_TOKEN);
    next();
  } catch { return res.status(401).json({ mess:'Invalid or expired token' }); }
};
exports.RoleAuth = (req,res,next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message:'Admin only' });
  next();
};
