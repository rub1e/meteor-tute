Messages = new Mongo.Collection("messages");



if(Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

  Template.body.events({
    "submit": function(event, template){
       event.preventDefault();
       const poster = Meteor.user() ? Meteor.user().username : "Anon";
       Messages.insert({text : $("#text").val(), poster : poster}, function (err, res) {
         $("#text").val("");
       });
    }
  });

  Template.body.helpers({
    messagesArray: function(){
      return Messages.find({});
    },

    loggedInName : function() {
      return Meteor.user().username;
    },

    stylings : function () {
      if(this.text.indexOf("@" + this.poster) > -1) {
        return {style : "color:red"};
      }
    }
  });

}
