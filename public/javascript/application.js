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
        var deleteButton = $("<div>").addClass("btn").addClass("btn-danger")
                           .addClass("delete").attr("contact-id", contact.id).text("Delete");
        var deleteCell = $("<td>").append(deleteButton);
        var row = $("<tr>").append(firstname).append(lastname).append(email).append(deleteCell);
        listBody.append(row);

      });
    },

    loadContacts: function(){
      var load = $.ajax({
        url: "/contacts"
      });

      load.done(handlers.displayContacts)
    },

    deleteContact: function(id){
      var statusDiv = $("#status");

      request = $.ajax({
        method: "post",
        url: "/contacts/delete/"+id
      });

      request.done(function(){
        statusDiv.addClass("alert").addClass("alert-success").text("Contact was successfully deleted.");
        handlers.loadContacts;
      })
      .fail(function(){
        statusDiv.addClass("alert").addClass("alert-danger").text("Cannot delete. Contact may not exist.");
      });
    }
  };

  handlers.loadContacts();

  $("#contact-list-body").on("click", ".delete", function(){
    var contactId = $(this).attr("contact-id");
    handlers.deleteContact(contactId);
  });

  $("#create-form").on("submit", function(event){
    $(this).reset();
    event.preventDefault;
  })

});
