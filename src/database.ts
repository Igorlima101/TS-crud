import mongoose from "mongoose";

async function connect(){

    try{

    await mongoose.connect('mongodb://localhost:27017/ts-crud')
    console.log('>>> Database connected')

    }
   
    catch{
        console.log('Erro, Não conectado')
    }
}

export default connect

