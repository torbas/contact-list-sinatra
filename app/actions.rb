# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  contacts = Contact.all
  contacts.to_json
end

post '/contacts/delete/:id' do
  if Contact.find(params[:id]).destroy
    status 202
  else
    status 404
  end
end

post '/contacts/create' do
  contact = Contact.new(firstname: params[:firstname],lastname: params[:lastname],email: params[:email]);
  if contact.save
    status 202
  else
    status 400
  end
end
