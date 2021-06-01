/** 
 *  sch_user.js
*/

const mongoose  = require('mongoose');
const shortid = require('shortid');

const userSchema = mongoose.Schema({
    '_id'            : { type : String, required : true, default : shortid.generate  },
    'firstname'      : { type : String, required : true  },
    'lastname'       : { type : String, required : true  },
    'email'          : { type : String, required : true  },
    'passwordHash'   : { type : String, required : true  },
    'dateSubscribed' : { type : Date, required   : true, default : Date.now  },
    'biography'      : { type : String, required : true  }
});

module.exports = mongoose.model('Users', userSchema, 'Users');