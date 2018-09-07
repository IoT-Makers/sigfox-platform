// these ops happen in MONGO_INITDB_DATABASE
db.createCollection('user',{})
db.createUser({ 
    user: "usr", pwd: "pwd", 
    roles: [{ role: "root", db: "admin" }]
    }
)