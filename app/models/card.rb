class Card < ActiveRecord::Base
  has_many :card_races, :dependent => :destroy
  has_many :races, :through => :card_races
end
