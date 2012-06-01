class Race < ActiveRecord::Base
  has_many :card_races, :dependent => :destroy
  has_many :cards, :through => :card_races
end
