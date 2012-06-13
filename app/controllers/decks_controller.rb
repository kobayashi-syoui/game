# coding: utf-8

class DecksController < ApplicationController
  before_filter do
    @key = params[:id]
    @decks = Deck.where(:key => @key).order(:card_id)
  end

  def edit
    @cards = Card.all
  end

  def add
    return redirect_to edit_deck_path(@key) if Deck.where(:key => @key, :card_id => params[:card_id]).count >= 3
    Deck.create! :key => @key, :card_id => params[:card_id]
    return redirect_to edit_deck_path(@key)
  end

  def delete
    Deck.delete(params[:deck_id])
    return redirect_to edit_deck_path(@key)
  end
end
