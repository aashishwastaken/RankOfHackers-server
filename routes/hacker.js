const router = require('express').Router();
const auth = require('../middleware/auth');
const Hacker = require('../models/hacker.model');
const data=require('../models/data');

let rankingAlgorithm=(hacker)=>{
    let {solutionsSubmitted,solutionsAccepted,ds,algo,cpp,java,python,html,js}=hacker;

    let a=(solutionsAccepted/solutionsSubmitted)*100;
    let b=(ds+algo)/2;
    let c=(cpp+java+python+html+js)/5;

    return (a+b+c)/3;
}

// router.get("/", async(req,res) => {
//     try{
//         // const { title } = req.body;

//         // if(!title)
//         //     return res.status(400).json({msg: "Not all fields have been entered"});

//         data.forEach(async (x,i)=>{
//             const newHacker = new Hacker(x);
//             const savedHacker = await newHacker.save();
//         });
        
//         res.send("completed");
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// })

router.get("/all",auth, async(req,res) => {
    const hackers = await Hacker.find({},'name profile');
    if(hackers)
    hackers.sort((a,b)=>a.name>b.name?1:-1);
    res.json(hackers);
})
router.get("/cpp",auth, async(req,res) => {
    const hackers = await Hacker.find({},'cpp name _id profile');
    if(hackers)
    hackers.sort((a,b)=>b.cpp-a.cpp);
    res.json(hackers);
})


// router.get("/all", auth, async(req,res) => {
//     const todos = await ToDo.find({ userId: req.user});
//     res.json(todos);
// })

router.get("/:id", auth, async(req,res) => {
    const hacker = await Hacker.findOne({ _id: req.params.id },'-_id -__v');
    if(!hacker)
        return res.status(400).json({msg: "No hacker found !!"});

    res.json(hacker);
})



router.get("/top/:count", auth, async(req,res) => {
    const hackers = await Hacker.find({});
    if(hackers)
    hackers.sort((a,b)=>rankingAlgorithm(b)-rankingAlgorithm(a));
    res.json(hackers.slice(0,req.params.count));
})

router.get("/recent/:count", auth, async(req,res) => {
    const hackers = await Hacker.find({},'timestamp name _id profile');
    if(hackers)
    hackers.sort((a,b)=>b.timestamp-a.timestamp);
    res.json(hackers.slice(0,req.params.count));
});



module.exports = router;