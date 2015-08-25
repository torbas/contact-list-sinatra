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
        var deleteButton = $("<span>").addClass("btn").addClass("btn-danger")
                           .addClass("delete").attr("contact-id", contact.id).text("Delete");
        var deleteCell = $("<td>").append(deleteButton);
        var row = $("<tr>").append(firstname).append(lastname).append(email).append(deleteCell);
        listBody.append(row);

      });
    },

    loadContacts: function(){
      $.ajax({
        url: "/contacts", 
        success: handlers.displayContacts
      });
    },

    deleteContact: function(id){
      console.log(contactId);
      // $.ajax({
      //   method: "post",
      //   url: "/contacts/delete/"+id, 
      //   success: function(){
      //     handlers.displayContacts()
      //   }
      // });
    }
  };

  handlers.loadContacts();

  $(".delete").on("click", function(){
      var contactId = $(this).attr("contact-id");
      handlers.deleteContact(contactId);
  });

});
