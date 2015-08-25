class Contact < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, format: {with: /\w+@\w+\.[a-z]+/, message: "Only valid emails allowed"}

end