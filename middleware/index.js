var Comment = require('../models/comment');
var Cafe = require('../models/cafe');
module.exports = {
  isLoggedIn: function(req, res, next){
      if(req.isAuthenticated()){
          return next();
      }
      req.flash('error', 'Please Sign In First to Process');
      res.redirect('/login');
  },
  checkUserCafe: function(req, res, next){
    Cafe.findById(req.params.id, function(err, foundCafe){
      if(err || !foundCafe){
          console.log(err);
          req.flash('error', 'Sorry, the cafe you searched does not exist.');
          res.redirect('/cafes');
      } else if(foundCafe.author.id.equals(req.user._id) || req.user.isAdmin){
          req.cafe = foundCafe;
          next();
      } else {
          req.flash('error', 'You don\'t have permission to do that!');
          res.redirect('/cafes/' + req.params.id);
      }
    });
  },
  checkUserComment: function(req, res, next){
    Comment.findById(req.params.commentId, function(err, foundComment){
       if(err || !foundComment){
           console.log(err);
           req.flash('error', 'Sorry, the comment does not exist!');
           res.redirect('/cafes');
       } else if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
            req.comment = foundComment;
            next();
       } else {
           req.flash('error', 'You don\'t have permission to do that!');
           res.redirect('/cafes/' + req.params.id);
       }
    });
  },
  isAdmin: function(req, res, next) {
    if(req.user.isAdmin) {
      next();
    } else {
      req.flash('error', 'This Site is Read-only, please retry.');
      res.redirect('back');
    }
  },
  isSafe: function(req, res, next) {
    if(req.body.image.match(/^https:\/\/images\.unsplash\.com\/.*/)) {
      next();
    }else {
      req.flash('error', 'Only images from images.unsplash.com allowed.\nSee https://youtu.be/Bn3weNRQRDE for how to copy image urls from unsplash.');
      res.redirect('back');
    }
  }
}