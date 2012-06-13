class Card < ActiveRecord::Base

  [1, 2].each do |i|
    define_method("skill#{i}") do
      return "" if skill_name(i).blank?

      "#{skill_name(i)}(#{self["skill#{i}_damage".to_sym]}/#{self["skill#{i}_cost".to_sym]})"
    end
  end

  def skill_name(index)
    self["skill#{index}_name".to_sym]
  end
end
