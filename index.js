
const express = require('express');
const app = express();
require('./services/cron')()

require('./startup/routes')(app);
const sequelize=require('./startup/db');
require('./startup/config')();









const port = process.env.PORT || 3000;
 
// Create all the table defined using
// sequelize in Database
	
// Sync all models that are not
// already in the database
 
sequelize.sync({force:false}).then((result) => {

    
  
    
    app.listen(port, () =>console.log(`Listening on port ${port}...`));

    
    
}).catch((err) => {
    console.log(err)
     console.log('Error in Create Server * index.js 29 *')
});
	




	
