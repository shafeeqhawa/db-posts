const {json} = require("body-parser");
const thinksyria= require('../db');

const creatUser= (req, res)=>{
    const name= req.body.name;
    const email= req.body.email;
    const password= req.body.password;
    const passwordConfirmation= req.body.password_confirmation;

    if (name?.length<3)
    return res.send({
        success: false,
        message: "Your name must be larger than 3",
        datd: []
    });
    if
    (!String(email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ))
      return res.send({
        success: false, 
        message: 'Sorrt! Email is not valid!',
        data: []
      });
      if (password?.length < 6)
      return res.send({
        success: false,
        message: "Password must be larger than 6",
        data: []
      });
      if(password.localeCompare(passwordConfirmation))
      return res.send({
        success: "false",
        message: "the password confirmation does not matching the password",
        data: []
});
thinksyria.query(
    `INSERT INTO users (username, email, password) VALUES ('${name}', '${email}', '${password}')`,
    (err,result)=>{
        if(err) {
            return res.send({
                success: false,
                message: err.message,
                data: []
            });
        }
        return res.send({
            success: true,
            message: 'your acount has been created',
            data: []
        });
    }
);

};
const login=(req,res)=>{
    const account=req.body.account;
    const password=req.body.password;
    if(!account || !password){
        return res.send({
            success: false,
            message: 'Please enter your username and your password!',
            data: []
        });
    }
    thinksyria.query(
        `SELECT * FROM users WHERE (username='${account}' OR email='${account}') AND (password='${password}')`,
    (err,result)=>{
        if(err){
            console.log(err);
            return res.status(201).send({
                success: false,
                message: "please ya haj cheack your username or eamil and your password!!",
                data: []
            });
        }
        console.log(result);
        if (result?.length > 0){
            return res.send({
                success: true,
                message: "AHlean Istaz",
                data: [],
                token : {
                    id: result[0]?.id,
                    username: result[0]?.username,
                    email: result[0]?.email
                }
            });
        }
        return res.status(401).send({
            success: false,
            message: "Oops, please cheack you username or your email and your password!",
            data: []
        });
    }
    );
};

const update=(req,res)=>{
    const id= req.body.id;
    const username=req.body.name1;
    const email=req.body.email;
    const password= req.body.password;

    if (username?.length<3)
    return res.send({
        success: false,
        message: "Your name must be larger than 3",
        datd: []
    });
    if
    (!String(email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ))
      return res.send({
        success: false, 
        message: 'Sorrt! Email is not valid!',
        data: []
      });
      if (password?.length < 6)
      return res.send({
        success: false,
        message: "Password must be larger than 6",
        data: []
      });
    thinksyria.query(`UPDATE users SET username='${username}', email='${email}', password='${password}' WHERE id='${id}'`,
    (err,result)=>{
        if(err){
            return res.send({
                success: false,
                message: err.message,
            })
        }
        return res.send({
            success: true,
            message: 'your information has been updated',
         
        })
    }
    )

}

module.exports={
    creatUser,
    login,
    update
}