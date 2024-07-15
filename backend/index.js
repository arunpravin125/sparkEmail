const express=require("express")
const cors =require("cors")
const mongoose =require("mongoose")
const app=express()
app.use(cors())

app.use(express.json())

const nodemailer = require("nodemailer");

 mongoose.connect("mongodb+srv://arunpravin123456:qazwsxedc@cluster0.3ckus04.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function(data){
    console.log("COnnected to DB")
 }).catch(function(){
    console.log("Failed to connect")
 })

 const credentail = mongoose.model("credentail",{},"bulkmail")

 

// const transporter = nodemailer.createTransport({
//   service:"gmail",
//   auth: {
//     user: "arunprav5@gmail.com",
//     pass: "lzxe eorr odou cuqg",
//   },
// });



app.post("/sendemail",function(req,res){
    var msg =req.body.msg
    var res =res
    var emailList = req.body.emailList
    console.log(msg)
    credentail.find().then(function(data){
        console.log(data[0].toJSON())
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              user:data[0].toJSON().user,
              pass:data[0].toJSON().pass,
            },
          })
          new Promise(async function(resolve,reject){
            try{
                for(var i=0;i<emailList.length;i++)
                    {
                  await transporter.sendMail({
                        from:"arunprav5@gmail.com",
                        to:emailList[i],
                        subject:"A message from bulk main app",
                        text:msg
                    })
                    console.log("Email sent to:"+emailList[i])
                    }
                   resolve("Success")
    
        }
           catch(error){
            reject("Failed")
           }
            
    
        }).then(function(){
            
            res.send(true)
        }).catch(function(){
            
            res.send(false)
        })
     }).catch(function(error){
        console.log(error)
     })
    // new Promise(async function(resolve,reject){
    //     try{
    //         for(var i=0;i<emailList.length;i++)
    //             {
    //           await  transporter.sendMail({
    //                 from:"arunprav5@gmail.com",
    //                 to:emailList[i],
    //                 subject:"A message from bulk main app",
    //                 text:msg
    //             })
    //             console.log("Email sent to:"+emailList[i])
    //             }
    //            resolve("Success")

    // }
    //    catch(error){
    //     reject("Failed")
    //    }
        

    // }).then(function(){
    //     res.send(true)
    // }).catch(function(){
    //     res.send(false)
    // })
//     try{
//         for(var i=0;i<emailList.length;i++)
//             {
//             transporter.sendMail({
//                 from:"arunprav5@gmail.com",
//                 to:emailList[i],
//                 subject:"A message from bulk main app",
//                 text:msg
//             })
//             }
//             res.send(true)
// }
//    catch(error){
//     res.send(false)
//    }

    

})


app.listen(5000,function(){
    console.log("Server started....")
})