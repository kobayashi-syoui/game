class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string  :name   ,:null => false
      t.text    :text
      t.text    :flavor
      t.integer :rarity, :null => false
      t.timestamps
    end
  end
end
