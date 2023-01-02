
const db=require('../db');

const getAllPosts=(req,res)=>{
    // const allposts=data.filter((posts)=>posts.deletedAt == null);
    db.query(`SELECT * FROM posts`, 
    (err,result)=>{
        if(err){
            return res.send({
                success: false,
                message: err.message,
                data: []
            })
        }
        return res.send({
            success: true,
            message: "Afirin sana, you took all the posts!",
            data: result
                  })
    })
};

const getSinglePost=(req,res)=>{
    const postId= req.params.id
    db.query(`SELECT content, userid FROM thinksyria.posts WHERE userid ='${postId}'`,
    (err,result)=>{
        if(err){
            return res.send({
                success: false,
                message: err.message,
                data: []
            })
        }
        if(result?.length>0)
        return res.send({
            success: true,
            message: "you get the single post, afarin sana",
            data:result
        });
        return res.send({
            success: false,
            message: 'maalasef by kesi psts yazmadi yet!'

        });
    }
    )

};

const createPost=(req,res)=>{
    const content= req.body.content
    const id=req.body.id

if(content?.length< 7)
return res.send({
    success: false,
    message: 'Sorry, you can not writte post less than 7 characters',
    data: []
})


    db.query
    (
    `INSERT INTO thinksyria.posts (content,userid) VALUES ('${content}', (SELECT '${id}' FROM thinksyria.users WHERE id='${id}'))`,
    (err,result)=>{
        if(err){
            return res.send({
                success: false,
                message: err.message,
                data: []
            })
        }
        return res.send({
            success: true,
            message: 'Tebrikler ,your post has been created!!',
            data: result
        })

    }
    )
    
};

// const deletePost=(req,res)=>{
//     const id=req.params.id
    
// }
const editPost=(req,res)=>{
    const postid= req.body.postid
    const content= req.body.content
    const userid=req.body.userid


    if(content?.length<7)
    return res.send({
        success: false,
        message: 'you can not post less tha 7 charecters',
       
    });
  
    db.query(`UPDATE thinksyria.posts SET content = '${content}' WHERE (id='${postid}' AND userid='${userid}')`,
    (err,result)=>{
        if(err){
            return res.send({
                success: false,
                message: err.message
            })            
        }
        if(userid && postid)
        return res.send({
            success: true,
            message: 'your post has been edited'
        })
        return res.send({
            success: false,
            message: 'you must add post id and user id'
        })
    }
    )

}




module.exports={
    getAllPosts,
    getSinglePost,
    createPost,
    // deletePost,
    editPost


}