const express = require("express");
const router = new express.Router();
const MensRanking = require("../models/mens");


// router.post("/mens",(req,res) => {   // promise method (not a good method)

//     const addingMensRecords = new MensRanking(req.body);

//     addingMensRecords.save().then(() =>{     // by this it gets saved in mongodb compass
//         res.status(201).send(addingMensRecords);
//         console.log(req.body);      //  prints the documents from post to vs code 
//     }).catch((e)=> {
//         res.status(400).send(e);
//     })

//     // res.send("Hello from the other sides");

// })

// create a new mens record

router.post("/mens",async(req,res) => {  // async await method(best method)

    try { 
         const addingMensRecords = new MensRanking(req.body);
         const insertMens = await addingMensRecords.save(); // by this it gets saved in mongodb compass
         res.status(201).send(insertMens);
         console.log(req.body);      //  prints the documents from post to vs code
    } catch (e) {
        res.status(400).send(e);
    }

})

//read the data of registered men

router.get("/mens",async(req,res) => {  // async await method(best method)

    try {
         const getMens = await MensRanking.find({}).sort({"ranking":1}); 
         res.send(getMens);
    } catch(e) {
        res.send(e);
    }

})

// get the individual men data using id

router.get("/mens/:id",async(req,res) => {  

    try {
         const _id = req.params.id;
        //  console.log(req.params.id);
        //  res.send(req.params.id);
      const getMen  = await MensRanking.findById({_id});
      console.log(getMen);
      if (!getMen){
          return res.status(404).send();
      }else{
        res.send(getMen);
      }
      
    } catch(e) {
        res.status(500).send(e); // server error
    }

})

// update the men by id 
router.patch("/mens/:id",async(req,res) => {  // async await method(best method)

    try {
        const _id = req.params.id;

         const updateMens = await MensRanking.findByIdAndUpdate(_id,req.body,{
             new:true
         }); 
         console.log(updateMens);

         res.send(updateMens);
    } catch(e) {
        res.status(500).send(e);
    }

})


// delete the men by id 

router.delete("/mens/:id",async(req,res) => {  // async await method(best method)

    try {

         const deleteMen = await MensRanking.findByIdAndDelete(req.params.id); 
         console.log(deleteMen);
         if (!req.params.id){
            return res.status(400).send();
        }else{
          res.send(deleteMen);
        }
    } catch(e) {
        res.status(500).send(e);
    }

})


module.exports = router;
