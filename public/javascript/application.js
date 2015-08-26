$(function() {
  var statusDiv = $("#status");
  var listBody = $("#contact-list-body");

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

      load.done(handlers.displayContacts)
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
    }
  };

  handlers.loadContacts();

  listBody.on("click", ".delete", function(){
    var contactId = $(this).attr("contact-id");
    handlers.deleteContact(contactId);
  });

  listBody.on("click", ".edit", function(){
    var contactId = $(this).attr("contact-id");
    
    var form = $("<form>").append(
      // Creating Form Div and Adding <h2> and <p> Paragraph Tag in it.
      $("<h3/>").text("Contact Form"), $("<p/>").text("This is my form. Please fill it out. It's awesome!"), $("<form/>", {
      action: '#',
      method: '#'
      }).append(
      // Create <form> Tag and Appending in HTML Div form1.
      $("<input/>", {
      type: 'text',
      id: 'vname',
      name: 'name',
      placeholder: 'Your Name'
      }), // Creating Input Element With Attribute.
      $("<input/>", {
      type: 'text',
      id: 'vemail',
      name: 'email',
      placeholder: 'Your Email'
      }), $("<textarea/>", {
      rows: '5px',
      cols: '27px',
      type: 'text',
      id: 'vmsg',
      name: 'msg',
      placeholder: 'Message'
      }), $("<br/>"), $("<input/>", {
      type: 'submit',
      id: 'submit',
      value: 'Submit'
    })));

    $(this).parent().append(form);



  });

  $("#contact-form").on("submit", function(){
    alert($(this).attr("value"));
    var data = {
      firstname: $("#firstname").val(),
      lastname: $("#lastname").val(),
      email: $("#email").val()
    }

    handlers.createContact(data);
    $(this)[0].reset();
    return false;
  });

});
