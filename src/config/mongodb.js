import { MongoClient } from "mongodb";

const url = process.env.DB_URL;

let client;
const connectToMongoDB=()=>
{
    MongoClient.connect(url).then(clientInstance=>
        {
            client = clientInstance;
            console.log('Mongodb is connected');
            createIndexes(client.db());
    })
    .catch(err=>console.log(err));
}

export const getDB=()=>{
    return client.db();
}

const createIndexes = async(db)=>{
    try {
        await db.collection('products').createIndex({productPrice:1});
        await db.collection('products').createIndex({productName:1, productCategory:-1});
        // await db.collection('products').createIndex({desc:"text"}) for text based index
        console.log('indexes are created')
        
    } catch (error) {
        console.log(error)
    }

}
export default connectToMongoDB;