export async function authorizeUser(req, res, next) {
    const listOfRoles = ['user', 'admin'];
  
    if (!listOfRoles.includes(req.user['rol'])) {
      return next(new Error('Not authorized'));
    }
  
    next();
  }
  
  export async function authorizeAdmin(req, res, next) {
    const listOfRoles = ['admin'];
  
    if (!listOfRoles.includes(req.user['rol'])) {
      return next(new Error('Not authorized'));
    }
  
    next();
  }