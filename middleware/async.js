module.exports = function (handler) {
  //To handle errors manually 
    return async (req, res, next) => {
    try {
      await handler(req, res);
    }
    catch(ex) {
      next(ex);
    }
  };  
}