const express = require('express');
const mysql = require("mysql2");

const app = express();


//Establish MySQL Database onnection
const db = mysql.createConnection({
        host: '127.0.0.1',
		port: '3306',
        user: 'fsw_140',
        password: "FSWfsw140!!",
		database: "Shannon_Todo"
});

//Connect to the MSQL Server
db.connect((err)=>{  
    if(err){
        throw err
    }
    console.log("MySQL Database Connection Established Successfully ");
})

//Create a New Database
app.get('/CreateDB', (req, res)=>{
    let sqlString = "CREATE DataBase Shannon_Todo"
    db.query(sqlString, (err, result)=>{
        if(err){
            throw err
        }
        console.log(result)
        res.send('Shannon_Todo database created successfully')
    })
})

//Create a New Table
app.get('/CreateTable', (req, res) => {
    let sqlString =  'CREATE TABLE Todos (id INT auto_increment, title VARCHAR(50), message VARCHAR(150), PRIMARY KEY(id))';
   //Execute the SQL String
	db.query(sqlString, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Todo Table Was Created Successfully');
    });
});

//Insert a Row 1 Into The Table
app.get('/InsertRow1', (req, res) => {
    let post = {title: 'First Todo', message: 'Clean the dishes'};
    let sqlString = 'INSERT INTO Todos set ?';
	//Execute the SQL String
    db.query(sqlString, post, (err, result) => { 
        if(err){
            throw err;
        }
        console.log(result);
        res.send("Congratualtions First Row Inserted Successfully");
    });
});

//Insert a Row 2 Into The Table
app.get('/InsertRow2', (req, res) => {
    let post = {title: 'Second Todo', message: 'Vaccum the floors'};
    let sqlString = 'INSERT INTO Todos set ?';
	//Execute the SQL String
    db.query(sqlString, post, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Congratulations Second Row Inserted Successfully');
    })
})
//Select Query to display all rows
app.get('/GetTodos', (req,res)=>{
    let sqlString = 'SELECT * FROM Todos'
    db.query(sqlString, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('SELECT query successful');
    })
});
//Selet Query WHERE row is id
app.get('/GetTodos/:id', (req, res)=>{
    let sqlString = `SELECT * FROM Todos WHERE id = ${req.params.id}`
    db.query(sqlString, (err,result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Awesome! You Selected a Todo by ID');
    })
});

//Selet Query Update row using id
app.get('/UpdateTodos/:id', (req, res)=>{
	let newTitle = 'Updated Title from Front End!';
    let sqlString = `UPDATE Todos SET title = '${newTitle}' WHERE id  = ${req.params.id}`
    db.query(sqlString, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Awesome! Your Todo UPDATED Successfully Based on the Condition Provided');
    })
});
app.get('/deleteRow/:id', (req,res)=>{
    let sqlString = `DELETE from Todos WHERE id = ${req.params.id}`
    db.query(sqlString, (err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Done! The Todo Was Successfully DELETED');
    })
});

app.listen("3306", () => {
    console.log('This server is running on port 3306')
});

