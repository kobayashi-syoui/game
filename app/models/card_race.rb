class CardRace < ActiveRecord::Base
  belongs_to :card
  belongs_to :race
end
