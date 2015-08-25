$(function() {

  var handlers = {
    displayContacts: function(result){
      parsedContacts = $.parseJSON(result);
      parsedContacts.forEach(function(contact){
        console.log(contact);
        var firstname = $("<td>").text(contact.firstname);
        var lastname = $("<td>").text(contact.lastname);
        var email = $("<td>").text(contact.email);
        $("<tr>").append(firstname).append(lastname).append(email).appendTo("#contact-list-body")
      });
    }
  };


  $.ajax({
    url: "/contacts", 
    success: handlers.displayContacts
  });
  
});
