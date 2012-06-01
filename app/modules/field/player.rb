class Array
  # Arrayの要素から、ユニークなキーを生成する(Rails ver)
  #
  # 数字、文字列はそのまま
  # ActiveRecordはClass + ID
  # その他のクラスはClass
  def to_key
    keys = []

    self.each do |value|
      case value
      when Numeric, String
        keys << value.to_s
      when ActiveRecord::Base
        keys += [value.class, value.id]
      else
        keys << value.class
      end
    end

    keys.join(":")
  end
end

class Field::Player
  # 手札
  attr_accessor :hand_cards

  # 山札
  attr_accessor :deck_cards

  # 墓地
  attr_accessor :cemetery_cards

  # フィールド
  attr_accessor :field_cards

  # HP
  # MP
  attr_accessor :hp, :mp

  def initialize(key)
    @key = key
  end

  [:hp, :mp].each do |key|
    define_method(key) do
      ret = $redis.get key.to_s
      ret ? ret.to_i : nil
    end

    define_method("#{key}=") do |value|
      $redis.set key.to_s, value
    end
  end
end
