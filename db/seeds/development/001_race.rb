Race.delete_all


c "人間", 1
c "動物", 2
c "植物", 3
c "アーティファクト", 4

c "猫", 101
c "犬", 102

def c(name, seq)
  Race.create!(:name => name, :seq => seq)
end
