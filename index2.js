const express = require('express');
const mysql = require('mysql');
const app = express();
const expressPort = 3001;

app.use(express.json())

const dataBase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    database: 'restapi2'
});

dataBase.connect((err) => {
if (err)
{
    console.log('ERREUR DE CONNEXION A LA DATABASE !');
}
else
{
    console.log('BRAVO VOUS ETES CONNECTE A LA DATABASE !');
}

});

app.listen( expressPort, () => {
    console.log('MON SERVEUR TOURNE SUR LE PORT: ', expressPort);
});



app.get('/items', (req, res) => {
 const sql = 'SELECT * FROM items2;';
 dataBase.query(sql, (err,result) =>{
if(err) {
 return res.status(500).json({error: 'ERREUR DU SERVEUR'});
}
else {
    return res.status(200).json(result);
}});});


app.post('/createItem', (req, res) => {
    const { name, price, description} = req.body;
    const sql = 'INSERT INTO items2 (name, price, description) VALUES(?,?,?)';
    const values = [name, price, description];
    dataBase.query(sql, values, (err, result) => {
       if (err) {
      return res.status(500).send(err.message);
       }
       return res.status(201).send('Item created succesfully');
    });
   });
   
   
   app.put('/updateItem/:id', (req, res) => {
       const {id} = req.params;  
       const {name, price, description} = req.body;  
   
       
       const sql = 'UPDATE items2 SET name = ?, price = ?, description = ? WHERE id = ?';
       const values = [name, price, description, id];
   
       dataBase.query(sql, values, (err, result) => {
           if (err) {
               return res.status(500).json({ error: err.message });  
           }
   
           
           if (result.affectedRows === 0) {
               return res.status(404).json({ error: 'No items found with this ID.' });
           }
   
           return res.status(200).send('Item updated successfully');
       });
   });
   
   
   app.delete('/deleteItem/:id', (req, res) => {
       console.log(req.params)
       const {id} = req.params; 
   
       const sql = 'DELETE FROM items2 WHERE id = ?';
       dataBase.query(sql, [id], (err, result) => {
   
           if (err) {
               return res.status(500).json(err);
           }
   
           if (result.affectedRows === 0) {
               return res.status(404).json('No item found with this ID.');
           }
   
           return res.status(200).send('Item deleted successfully');
       });
   });  
      

   
