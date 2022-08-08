module.exports = function(err, req, res, next){

  console.log(err.message);
  

  // error
  // warn
  // info
  // verbose
  // debug 
  // silly

  // res.status(500).send('Something failed.');
  res.status(500).send(err.message);
}