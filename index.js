const http = require('http');
const path = require('path');
const fs = require('fs');
const process = require('process');
// const mongo = require('mongodb'),
//     Server = mongo.Server,
//     Db = mongo.Db;

// let mongosServer = new Server('localhost', 27017, {
//     auto_reconnect: true
// });
// let db = new Db('restaurant', mongosServer);
// let onErr = function(err, callback) {
//     db.close();
//     callback(err);
// };

const {MongoClient} = require('mongodb');
let uri = "mongodb+srv://szilagyi_peter96:666Thenumberofthebeast@mycluster-ndtih.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let connect = async () => {
    await client.connect();
    console.log("Mongo connected.");
}
connect();

const server = http.createServer((req, res) => {

    // console.log(req.url);

    // Build filepath
    let filePath = path.join(
        __dirname, 'public',
         req.url === '/' ? 'index.html' : req.url);

    // Extension of file
    let extName = path.extname(filePath);

    // Initial content type
    let concentType = 'text/html';

    let regex = new RegExp('mongo-[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]');
    if(regex.test(req.url)) {
       
        let requestedDate = req.url.slice(7,17);
        console.log("req date: " + requestedDate);

        let data;
        let getMongoData = async (reqDate) => {
            // await client.connect();
            console.log("cilent connected.")
            data = await client.db('restaurant').collection('booking').find({"date": reqDate}).toArray();
            
            console.log("DATA stringified:")
            console.log(JSON.stringify(data));

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(data));
            res.end();
            
            // await client.close();
            // console.log("client closed finally.");
        }

        try{
            getMongoData(requestedDate);
            return;
        }
        catch(error){
            console.log("ERROR: " + error);
        }
        // finally{
        //     async () => {
        //         await client.close();
        //         console.log("client closed finally.");
        //     };
        // }
        

    }

    // Check extension and set content type

    switch(extName) {
        case '.js':
            concentType = 'text/javascript';
            break;
        case '.css':
            concentType = 'text/css';
            break;
        case '.png':
            concentType = 'image/png';
            break;
        case '.jfif':
            concentType = 'image/jpeg';
            break;
        case '.jpeg':
            concentType = 'image/jpeg';
            break;
        case '.json':
            concentType = 'application/json';
            break;
    }

    // Read File
    fs.readFile(filePath, (err, content) => {

        if(err) {
            if(err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                });
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, {'Content-Type': concentType});
            res.end(content);
        }


    });

    

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
/*
function promiseState(p) {
    const t = {};
    return Promise.race([p, t])
      .then(v => (v === t)? "pending" : "fulfilled", () => "rejected");
}

// MONGODB DATABASE
const {MongoClient} = require('mongodb');

async function main() {
    let uri = "mongodb+srv://szilagyi_peter96:666Thenumberofthebeast@mycluster-ndtih.gcp.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        // await  listDatabases(client);
        
        let data = await getData(client);

        console.log("MAIN:")
        console.log(data);
        return data;
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function getData(client){

    let data = await client.db('restaurant').collection('booking').find().toArray();
    // JSON.stringify(data);
    console.log("GETDATA:")
    console.log(data);
    return data;
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
*/

if (process.platform === "win32") {
    var rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    rl.on("SIGINT", function () {
      process.emit("SIGINT");
    });
  }
  
  process.on("SIGINT", function () {
    //graceful shutdown
    process.exit();
  });

process.on('exit', (code) => {
    () => {
        client.close();
        console.log("mongo client closed with server.");
    };
    console.log("Exiting with code " + code);
});