class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name
      t.integer :race1
      t.integer :race2
      t.integer :race3
      t.integer :race4
      t.integer :hp
      t.integer :cost

      t.string :skill1_name
      t.integer :skill1_damage
      t.integer :skill1_cost
      t.string :skill1_element
      t.text :skill1_text

      t.string :skill2_name
      t.integer :skill2_damage
      t.integer :skill2_cost
      t.string :skill2_element
      t.text :skill2_text

      t.text :effect
      t.text :flavor

      t.timestamps
    end
  end
end
