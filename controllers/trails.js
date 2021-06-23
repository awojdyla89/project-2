
// file path in controller starts with the view directory
const User = require('../models/user');
const Trail = require('../models/trail');

module.exports = {
  index,
  new: newTrail,
  create,
  show, 
  delete: deleteTrail,
  edit,
  update
  
};

//console.log(trail.userId, "---USERID")
function update(req, res){

     Trail.findById(req.params.id, function(err, trail) {

       //trail.userId = req.user._id;
       
       console.log("userId: ---->", trail.usersTrail, "req.user._id: ----> ", req.user._id)
       console.log(trail, "<---- TRAIL SCHEMA!!!")

       if (!trail.usersTrail.equals(req.user.id)) return res.redirect("/trails");

        trail.trailName = req.body.trailName
       
      trail.save(function(err) {
        res.redirect(`/trails/${trail._id}`);
      });
    });
}

function edit(req, res){

  Trail.findById(req.params.id, function(err, trail){
    
    //trail.userId = req.user._id;
    
     if(!trail.usersTrail.equals(req.user.id)) return res.redirect('/trails');

     console.log("REDNERING!!!!")
    res.render('trails/edit', {trail});
  })
}

function deleteTrail(req, res){
  Trail.findByIdAndDelete(req.params.id, function(){
    res.redirect('/trails');
  })
}

// shows the details of each trail on the ratings.ejs
function show(req, res){
  Trail.findById(req.params.id, function(err, trailDocuments){
    res.render('trails/ratings', {
      trail: trailDocuments,
      user: req.user
    })
  })
}

//  form is used in the new.ejs page 
function create(req, res){
  const trail = new Trail(req.body);
  trail.user = req.user._id;
  trail.userId = req.user._id;
  trail.usersTrail = req.user._id
  
  trail.save(function(err){
    if (err) return res.redirect('/trails/new');
    res.redirect('/trails');
  })
}

function index(req, res){
  console.log("HITS THE INDEX in index.ejs")

  Trail.find({}, function(err, trailDocuments){
    res.render('trails/index', {
      trails: trailDocuments
    })
  })
  
}

function newTrail(req, res){
  res.render('trails/new');
}
