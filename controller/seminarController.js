const seminarModel = require('../models/seminarModel');
const {validateSeminar, validateSeminar2} = require('../helpers/validator')

// create space by book a new seat
const bookSeat = async (req, res) =>{
    try{
        const {error} = await validateSeminar(req.body);
       if(error){
        res.status(500).json({
            message: error.details[0].message,
        }); return
    } else {const {name, email, age, gender, seatNumber, topic, section} = req.body;
    const seat = new seminarModel({
        name, email, age, gender, seatNumber, topic, section});
    const existing = await seminarModel.findOne({email});

    const existingSeat = await seminarModel.findOne({seatNumber});
    
    if (existing){
        return res.status(400).json({
            message: "Sorry, can not book a seat, email already exist",
        });
    } 
    
    if (existingSeat){
        return res.status(400).json({
            message: "Sorry, can not book seat, seat number already booked",
        })
    }

    if(age < 18 || age >= 46){
        return res.status(400).json({
            message: "Invalid age "
        })
    };

    await seat.save();
    res.status(201).json({
        message: "seat booked successfully",
        data: seat,
    })};
        
    } catch(error){
        res.status(500).json({
            meassage: error.meassage
        });
    }
};

// get all booked seat
const allBookedseat = async (req, res) =>{
      try {
        const seats = await seminarModel.find();
        if(!seats){
            res.status(404).json({
                message: "no seat booked",
            });
        }  else {
            res.status(201).json({
                message: "All booked seats",
                data: seats,
                totalNumberOfSeats: seats.length,
            });
        }
      }  catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }   
};

// get a seat
const bookedseat = async (req, res)=>{
    try { 
        const  seatId = req.params.seatId;
         const seat = await seminarModel.findById(seatId)
         if(!seat){
            res.status(404).json({
                message: "No seat booked",
            });
         } else {
            res.status(201).json({
                message: "A booked seat",
                data: seat,
            });
         }  
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update a seminar seat
const updateSeat = async (req, res) => {
    try{
        const {error} = await validateSeminar2(req.body);
       if(error){
        res.status(500).json({
            message: error.details[0].message,
        }); return
    } else{// track the user id
        const seatId = req.params.seatId;
        //track seminar seat with the id gotten
        const seat = await seminarModel.findById(seatId);
        // check for entity and replace with existing data
        const seatData = {
            name: req.body.name || seat.name,
            email: req.body.email || seat.email,
            age: req.body.age || seat.age,
            gender: req.body.gender || seat.gender,
            seatNumber: req.body.seatNumber || seat.seatNumber,
            topic: req.body.topic || seat.topic,
            section: req.body.section || seat.section
        };
    
        // check for error
        if (!seat){
          res.status(404).json({
              message: `candidate with id: ${seatId} is not found.`
          }); return
      }
        // update the candidate seat
         await seminarModel.findByIdAndUpdate(seatId, seatData, {new: true})
    
            res.status(200).json({
                message: `candidate with id: ${seatId} has been updated successfully.`,
                data: seatData,
            });}
      
  }catch(err){
      res.status(500).json({
           message: err.message});
  }
  };
  // Delete a seat
const deleteSeat = async (req, res) => {
    try{
      // track the user id
      const seatId = req.params.seatId;
      //track seat with the id gotten
      const seat = await seminarModel.findById(seatId);
      // check for error
      if (!seat){
          res.status(404).send(`candidate with id: ${seatId} is not found.`);return
      }
      // delete the seat
      await seminarModel.findByIdAndDelete(seat)
      return res.status(200).json({
          message: `candidate with id: ${seatId} was successfully deleted.`,
          data: seat,
      }); 
  }catch (err) {
      res.status(500).json({ 
          message: err.message});
  }
  }  

module.exports = {
    bookSeat,
    allBookedseat,
    bookedseat,
    updateSeat,
    deleteSeat
}
