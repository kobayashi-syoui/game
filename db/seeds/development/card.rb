Card.destroy_all

def c(name, text, flavor, rarity)
  Card.create!(:name => name, :text => text, :flavor => flavor, :rarity => rarity)
end
