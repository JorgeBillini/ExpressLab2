const express = require('express');
const app = express();
const port = 8000;
const file = require(`./routes/ReadWriteLoad.js`)
// Check if class exists
/*
if exists then update {
    load
    process data(json.parse) lol 
    check if the student exists
    if student exists {
        Rewrite Student Data
    }
    if not 
    push all that data into an arr

    Once we are done we will save into JSON OBJECT
}
response.send should look like
{
    added: {req.query.name, req.query.age, req.query.city, req.query.grade}
    class: req.query.class
}
*/
app.get('/class/add',(req,res)=>{
    const students = [];
    const currentStudent = {
        name: req.query.name,
        age: req.query.age,
        city: req.query.city,
        grade: req.query.grade,
    };
    students.push(currentStudent);
    let currentData = {
        students: students,
        class : req.query.class,
    }
       
    file.load(req.query.class,JSON.stringify(currentData),(data,classname)=>{
        data = JSON.parse(data);
     currentData = data;
     currentData.students.push(students[0]);
    file.save(req.query.class,JSON.stringify(currentData),(data)=>{
        res.send({
            added: {name:req.query.name,age:req.query.age,city:req.query.city,grade:req.query.grade},
            'class': req.query.class
        })
    })
    
    })
    
})
     app.get(`/class/list`,(req,res)=>{
    console.log('Welcome to your list');
    let currentData;
    file.readOnly(req.query.class,(data,err)=>{
        if (err){
            res.send({
               message:`${req.query.class} is not a valid class name` 
            })
        }
        data = JSON.parse(data);
        currentData = data;
        res.send({
        students: currentData.students,
    })
    })

   
})
// req.query.class && req.query.city
    app.get(`/class/listfromcity`,(req,res)=>{
        let currentData;
    file.readOnly(req.query.class,(data,err)=>{
        if (err){
            res.send({
               message:`${req.query.class} is not a valid class name` 
            })
        }
        data = JSON.parse(data);
        currentData = data;
        let filteredObj = {
            students : []
        }
        for ( let i = 0 ; i < currentData.students.length; i++){
            if (req.query.class === currentData.class && req.query.city === currentData.students[i].city){
                filteredObj.students.push(currentData.students[i]);
            }
        }
       res.send(filteredObj);
    })
    })
    app.get(`/class/listfailing`,(req,res)=>{
        let currentData;
    file.readOnly(req.query.class,(data,err)=>{
        if (err){
            res.send({
               message:`${req.query.class} is not a valid class name` 
            })
        }
        data = JSON.parse(data);
        currentData = data;
        let filteredObj = {
            students : []
        }
        for ( let i = 0 ; i < currentData.students.length; i++){
            let currentGrade = parseInt(currentData.students[i].grade);
            if (req.query.class === currentData.class && currentGrade < 60 ){
                filteredObj.students.push(currentData.students[i]);
            }
        }
       res.send(filteredObj);
    })
    })
    

    app.listen(port,()=>{
    console.log(`listening on ${port}`);
})
/*
{
  students: [
    { name: 'John', age: 30, city: 'NYC', grade: 75 },
    { name: 'Emily', age: 28, city: 'LA', grade: 80 }
  ]
}
// load class file using req.query.class
[{req.query.name for name
req.query.age for age
req.query.city for city
req.query.grade for grade}]
 // path will be './classes/${req.query.classname}'
*/
