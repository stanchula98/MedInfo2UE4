const sqlite3 = require('sqlite3').verbose();

let bloodpreassure_json = require("../src/parsed_data/Blutdruck.json") ;
let bloodsugar_json = require("../src/parsed_data/Blutzucker.json");
let weight_json = require("../src/parsed_data/Gewicht.json") ;
let steps_json = require("../src/parsed_data/Schritte.json") ;
let meta_json = require("../src/parsed_data/Metadaten.json") ;

function insertStepData(){
    let db = new sqlite3.Database('db.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.');
      });

    steps_json.forEach(row => {
        var columns = ['guid']; 
        var data = [row.GUID]

        

        for(var i=1; i<=410; i++){
            columns.push(`tag${i}`)
            data.push(row.steps[i-1])
        }
        var placeholders = '(' + data.map(() => '?').join(', ') + ')';


        console.log(row.steps.length)
        columns = columns.join(', ')
        db.run(`INSERT INTO steps(${columns}) VALUES ${placeholders}`,
         data, function(err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);
          });
    })

    db.close();
}

function insertMetaData(){
    let db = new sqlite3.Database('db.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.');
      });

    meta_json.forEach(row => {
        var data = [row.GUID, row.gender, row.ageGroup, row.placeOfResidence]
        db.run(`INSERT INTO meta(guid, gender, ageGroup, placeOfResidence) VALUES (?,?,?,?)`,
         data, function(err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);
          });
    })

    db.close();
}

function insertBloodPressureData(){
    let db = new sqlite3.Database('db.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.');
      });

    bloodpreassure_json.forEach(row => {
        var data = [row.GUID, row.timestamp, row.value[0], row.value[1], row.value[2]]
        console.log(data)
        db.run(`INSERT INTO blood_pressure(guid, timestamp, systol, diastol, bpm) VALUES (?,?,?,?,?)`,
         data, function(err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);
          });
    })

    db.close();
}

function insertWeightData(){
    let db = new sqlite3.Database('db.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.');
      });

    weight_json.forEach(row => {
        var data = [row.GUID, row.timestamp, row.value[0], row.unit[0]]
        db.run(`INSERT INTO weight(guid, timestamp, value, unit) VALUES (?,?,?,?)`,
         data, function(err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);
          });
    })

    db.close();
}

function insertBloodSugarData(){
    let db = new sqlite3.Database('db.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.');
      });

    bloodsugar_json.forEach(row => {
        var data = [row.GUID, row.timestamp, row.value[0], row.unit[0]]
        db.run(`INSERT INTO blood_sugar(guid, timestamp, value, unit) VALUES (?,?,?,?)`,
         data, function(err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);
          });
    })

    db.close();
}

function createTables(){
    let db = new sqlite3.Database('db.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.');
      });
    
      var sql = `CREATE TABLE IF NOT EXISTS meta(
                    guid STRING,
                    gender STRING,
                    ageGroup STRING,
                    placeOfResidence STRING
                );`
    
      db.exec(sql)
    
      sql = `CREATE TABLE IF NOT EXISTS blood_pressure(
        guid STRING,
        timestamp DATETIME,
        systol STRING,
        diastol STRING,
        bpm STRING
    );`
    
    db.exec(sql)
    
    sql = `CREATE TABLE IF NOT EXISTS blood_sugar(
        guid STRING,
        timestamp DATETIME,
        value STRING,
        unit STRING
    );`
    
    db.exec(sql)
    
    sql = `CREATE TABLE IF NOT EXISTS weight(
        guid STRING,
        timestamp DATETIME,
        value STRING,
        unit STRING
    );`
    
    db.exec(sql)
    
    var days = "tag1 STRING \n "
    
    for(var i = 2; i<=410; i++){
        days = days + `,tag${i} STRING \n `
    }
    
    sql = `CREATE TABLE IF NOT EXISTS steps(
        guid STRING,
        ${days}
    );`
    
    console.log(sql)
    
    db.exec(sql)
    
    
    db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
    });
}

createTables()

insertBloodPressureData()
  
insertBloodSugarData()

insertWeightData()

insertMetaData()

insertStepData()