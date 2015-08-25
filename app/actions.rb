# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  contacts = Contact.all
  contacts.to_json
end

post '/contacts/delete/:id' do
  if true #Contact.find(params[:id]).destroy
    status 202
  else
    status 404
  end
end
