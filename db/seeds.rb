contact_list = [
  [ "John", "Doe", "john@email.com" ],
  [ "Jane", "Doe", "jane@email.com" ],
  [ "Smith", "Jones", "smith@email.com" ],
  [ "William", "Tell", "william@email.com" ]
]

contact_list.each do |firstname, lastname, email|
  Contact.create( firstname: firstname, lastname: lastname, email: email )
end