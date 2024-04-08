// Route Authorization Middleware
let roles ={
    ADMIN:"admin",
    SUBADMIN:"subadmin"
}

function requireRole(role) {
  return function(req, res, next) {
    if (req.user && req.user.role === role) {
        if(isRouteAllowedforRole(req.originalurl, role))
        {
            next();
        }
        else{
      res.status(403).send('Unauthorized');
            
        }
    } else {
      res.status(403).send('Unauthorized');
    }
  };
}

isRouteAllowedforRole(routes, role)
{
    const allowedRoutes ={
        admin:['/', '/about', '/profile', '/settings', '/dashboard'],
        subadmin:['/', '/about', '/profile']

    }
    //pasport authentication;

    return allowedRoutes[role].include(routes);
}
app.get('/admin', requireRole(roles.ADMIN), function(req, res) {
    // Admin dashboard route
  });

  app.get('/subadmin/dashboard', requireRole(roles.SUBADMIN), function(req, res) {
    // Subadmin dashboard route
  });