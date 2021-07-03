const fs = require('fs');
var log = require('./untils/logger')



let toHTML = function(file, data){
    fs.writeFile(file, data, function (err) {
        if (err){
            log(err,'err')
        }
        log('Wrote '+file,'ok')
      })
}


module.exports = toHTML;