class Contact < ActiveRecord::Base
  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :email, presence: true, format: {with: /\w+@\w+\.[a-z]+/, message: "Only valid emails allowed"}, uniqueness: true

end