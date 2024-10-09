const login = async(req,res) =>{
    try{

    }catch(error){
        return res.status(200).json({error:error.message,success:false})
    }
}

const signup = async(req,res) =>{
    try{

    }catch(error){
        return res.status(200).json({error:error.message,success:false})
    }
}


const logout = async(req,res) =>{
    try{

    }catch(error){
        return res.status(200).json({error:error.message,success:false})
    }
}


module.exports = {
    login,
    signup,
    logout
}