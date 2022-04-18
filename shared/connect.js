const {MongoClient} = require('mongodb')
module.exports ={
    db:{},
    async connect(){
        try{
            console.log(process.env.mongodb_url)
            const client = await MongoClient.connect(process.env.mongodb_url)
            this.db = client.db('Hall-Booking')
            console.log(this.db)
        }
        catch(err){
            res.send(err)
        }
    }
}