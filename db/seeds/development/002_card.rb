Card.delete_all
CardRace.delete_all



def c(name, flavor, rarity)
  Card.create!(:name => name, :flavor => flavor, :rarity => rarity)
end
