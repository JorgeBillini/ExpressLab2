const fs = require('fs');

const load = (classname,filedata, cb) => {
    console.log('LOADING');
    fs.readFile(`./classes/${classname}.json`,(err,data)=>{
        if(err){
           save(classname,filedata,(data,err)=>{
               console.log(err);
           })
        }
       else  cb(data);
    })
}
const save = (className,data,cb) =>{
    console.log('SAVING');
    fs.writeFile(`./classes/${className}.json`,data, (err, res) => {
        console.log(err,res)       
        cb(data);
    })
}

module.exports = { 
    save,
    load,
}