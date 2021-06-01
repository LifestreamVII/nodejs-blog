/** 
 *  sch_article.js
*/

const mongoose  = require('mongoose');
const shortid = require('shortid');
require('../models/mdl_category');
require('../models/mdl_author');

const articleSchema = mongoose.Schema({
    '_id'            : { type : String, required : true, default : shortid.generate  },
    'title'      : { type : String, required : true  },
    'dateCreated' : { type : Date, required   : true, default : Date.now  },
    'content'          : { type : String, required : true  },
    'category'   : { type : String, required : true, ref : 'Categories'  },
    'author'      : { type : String, required : true, ref : 'Authors'  }
});

module.exports = mongoose.model('Articles', articleSchema, 'Articles');