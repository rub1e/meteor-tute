Messages = new Mongo.Collection("messages");

Template.body.events({
  "submit": function(event, template){
     event.preventDefault();
     Messages.insert({text : $("#text").value, poster : Meteor.user().userName}, function (err, res) { $("#text").text("");});
  }
});

Template.body.helpers({
  messagesArray: function(){
    return Messages.find({});
  },

  loggedInName : function() {
    return Meteor.user().userName;
  },

  stylings : function () {
    if(this.text.indexOf("@" + this.poster) > -1) {
      return {color : red};
    }
  }
});
