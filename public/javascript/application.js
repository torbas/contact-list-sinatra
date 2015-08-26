$(function() {
  var statusDiv = $("#status");
  var listBody = $("#contact-list-body");
  var contactsForm = $("#contacts-form");
  var inputFirstname = $("#firstname");
  var inputLastname = $("#lastname");
  var inputEmail = $("#email");

  var handlers = {
    displayContacts: function(result){

      //clear list body to simulate reload
      listBody.empty();

      parsedContacts = $.parseJSON(result);
      parsedContacts.forEach(function(contact){
        
        var firstname = $("<td>").text(contact.firstname);
        var lastname = $("<td>").text(contact.lastname);
        var email = $("<td>").text(contact.email);
        var deleteButton = $("<div>").addClass("btn").addClass("btn-danger")
                           .addClass("delete").attr("contact-id", contact.id).text("Delete");
        var editButton = $("<div>").addClass("btn").addClass("btn-primary")
                           .addClass("edit").attr("contact-id", contact.id).text("Edit");
        var deleteCell = $("<td>").append(editButton).append(" ").append(deleteButton);
        var row = $("<tr>").append(firstname).append(lastname).append(email).append(deleteCell);
        listBody.append(row);

      });
    },

    loadContacts: function(){
      var load = $.ajax({
        url: "/contacts"
      });

      load.done(handlers.displayContacts);
    },

    deleteContact: function(id){

      request = $.ajax({
        method: "post",
        url: "/contacts/delete/"+id
      });

      request.done(function(){
        statusDiv.addClass("alert").addClass("alert-success").text("Contact was successfully deleted.");
        handlers.loadContacts();
      })
      .fail(function(){
        statusDiv.addClass("alert").addClass("alert-danger").text("Cannot delete. Contact may not exist.");
      });
    },

    createContact: function(data){
      request = $.ajax({
        method: "post",
        data: data,
        url: "/contacts/create"
      });
      request.done(function(){
        statusDiv.addClass("alert").addClass("alert-success").text("Contact was successfully created.");
        handlers.loadContacts();
      })
      .fail(function(){
        statusDiv.addClass("alert").addClass("alert-danger").text("Cannot create contact.");
      });
    },

    updateContact: function(data){
      console.log(data);
      // request = $.ajax({
      //   method: "post",
      //   data: data,
      //   url: "/contacts/"
      // });
      // request.done(function(){
      //   statusDiv.addClass("alert").addClass("alert-success").text("Contact was successfully created.");
      //   handlers.loadContacts();
      // })
      // .fail(function(){
      //   statusDiv.addClass("alert").addClass("alert-danger").text("Cannot create contact.");
      // });
    }
  };

  handlers.loadContacts();

  listBody.on("click", ".delete", function(){
    var contactId = $(this).attr("contact-id");
    handlers.deleteContact(contactId);
  });

  listBody.on("click", ".edit", function(){
    var contactId = $(this).attr("contact-id");

    $('html, body').animate({
      scrollTop: contactsForm.offset().top
    }, 500);

    var load = $.ajax({
      url: "/contact/"+contactId
    });

    load.done(function(result){
      parsed = $.parseJSON(result)
      inputFirstname[0].value = parsed.firstname;
      inputLastname[0].value = parsed.lastname;
      inputEmail[0].value = parsed.email;
      contactsForm.attr("form-role", "update");
      $("#contact-id").attr("value", contactId)
    });

  });

  contactsForm.on("submit", function(){
    var data = {
      id:        $("#contact-id").val(), 
      firstname: inputFirstname.val(),
      lastname:  inputLastname.val(),
      email:     inputEmail.val()
    }

    formRole = $(this).attr("form-role");

    if(formRole=="create")
      handlers.createContact(data);
    else if (formRole=="update"){
      handlers.updateContact(data);
      $(this).attr("form-role", "create");
    }

    $(this)[0].reset();
    return false;
  });

});
