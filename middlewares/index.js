const db=require ('../db')

const isAuth=(req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization?.split("Bearer")[1]
        const json= JSON.parse(token)
        db.query(`SELECT * FROM users WHERE username='${json.username}' AND '${json.id}'`,
        
        (err,result)=>{
            if(err){
            return res.send({
                success: false,
                message:"LOGIN FIRST",
                data: []
            })
        }

        if (result?.length>0){
            req.user={
                ...result[0]

            }
            next()
        }
        else return res.send({
            success: false,
            message: "LOGIN FIRST",
            data: []
        })
    }
        
        )
    }else 
    return res.status(401).send({
        success: false,
        message: "LOGIN FIRTS",
        data: []
    })
}

module.exports={
    isAuth
}