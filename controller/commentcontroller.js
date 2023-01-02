const db = require('../db')

const createcomment=(req,res)=>{
    const content= req.body.content
    const userid=req.body.userid
    const postid=req.body.postid

    if(content?.length < 7)
    return res.send({
        success: false,
        message: "you can not write comment less than 7 cha."

    });

    db.query(`INSERT INTO thinksyria.comments (content, postid, userid ) VALUES ('${content}', '${postid}','${userid}' )`,
    (err,result)=>{
        if(err){
            return res.send({
                success: false,
                message: 'you have to be the owner'
            })
        }
        return res.send({
            success: true,
            message: "Tebrikler, your comment has been done!!",
            
        })
    }
    )

};
const getcomment=(req,res)=>{
const id=req.params.id

if(id){
    db.query(`SELECT * FROM thinksyria.comments WHERE postid='${id}'`,
    (err,result)=>{
        if(err){
            return res.send({
                success: false,
                message: err.message
            })
        }
        return res.send({
            success: true,
            message: "you have all comments",
            data: result
        })

    }
    )
}

};
const editcomment=(req,res)=>{
    const commentid=req.body.id
    const content= req.body.content
    const userid=req.body.userid
    if(content?.length<7)
    return res.send({
        success: false,
        message: 'you can not post less tha 7 charecters',
       
    });
    db.query(`UPDATE thinksyria.comments SET content='${content}' userid='${userid}', id='${commentid}'`,
    (err,result)=>{
        if(err){
            return res.send({
                success: false,
                message: err.message,
            })
        }
        if(userid && commentid)
        return res.send({
            success: true,
            message: "your comment has been edited",
            data: result
        })
        return res.send({
            success: false,
            message: " you must enter the post id and user id and comment id, thanks for trying"
        })

        })
    }
    





module.exports={
    createcomment,
    getcomment,
editcomment
}