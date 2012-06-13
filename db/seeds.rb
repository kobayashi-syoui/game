# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

file_names = Dir::glob("#{Rails.root}/db/seeds/#{Rails.env}/*").sort
  
file_names.each do |file_name|  
  require(file_name) if File.exist?(file_name)
end
