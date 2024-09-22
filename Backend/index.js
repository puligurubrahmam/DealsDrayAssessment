const express = require('express');
const cors = require('cors');
require('./db/config')
const User = require('./db/User')
const app = express();
app.use(cors());
app.use(express.json());
app.post("/register",async (req,res)=>
    {
        const user = new User(req.body);
        const userresult = await user.save();
        res.send(userresult)
    })
    app.post("/login",async (req,res)=>
        {
            let response = await User.findOne(req.body);
            if(response != undefined)
            {
                res.send(response);
            }
            else
            {
                res.status(400);
                res.send("Invalid User")
            }
        })
app.post("/addemp",async (req,res)=>
{
    let user = await User.updateOne(
        { _id: req.body.user},
        { $push: { employers: req.body } }
    );
    
    res.send(user)
})

app.post("/emplist",async (req,res)=>
{
    let resultList = await User.findOne({_id:req.body.id});
    if(resultList.employers!==null)
    {
        res.send(resultList.employers);
    }
})
app.put("/updateemp",async (req,res)=>
{
    const updatedUser = await User.findOneAndUpdate(
        {_id:req.body.user,"employers._id":req.body.emp},
        {$set:{"employers.$":req.body}}
    )
    res.send(updatedUser)
})
app.delete("/delete",async (req,res)=>
{
    const userDeleted=await User.updateOne(
            {_id:req.body.user},
            { $pull: { employers: { _id:req.body.employeeId } }}
    )
    res.send(userDeleted);
})
app.listen(5000,()=>
{
    console.warn("Server Started at https://localhost:5000")
});