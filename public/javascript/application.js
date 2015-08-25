$(function() {

  var handlers = {
    displayContacts: function(result){
      var listBody = $("#contact-list-body");

      //clear list body to simulate reload
      listBody.empty();

      parsedContacts = $.parseJSON(result);
      parsedContacts.forEach(function(contact){
        
        var firstname = $("<td>").text(contact.firstname);
        var lastname = $("<td>").text(contact.lastname);
        var email = $("<td>").text(contact.email);
        //var deleteButton = $("").
        var row = $("<tr>").append(firstname).append(lastname).append(email);
        listBody.append(row);

      });
    },

    loadContacts: function(){
      $.ajax({
        url: "/contacts", 
        success: handlers.displayContacts
      });
    }
  };

  handlers.loadContacts();

});
