import mongoose from 'mongoose'

const connectToDatabase = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDb connected at ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('Error:' , error.message)
        process.exit(1)
        
    }
}

export default connectToDatabase