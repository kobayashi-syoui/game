class CreateDecks < ActiveRecord::Migration
  def change
    create_table :decks do |t|
      t.string :key
      t.belongs_to :card
      t.timestamps
    end
  end
end
