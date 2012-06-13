# coding: utf-8

class MainsController < ApplicationController

  class FieldInfo
    def initialize(key)
      @key = key
    end

    def reset
      Rails.cache.delete("deck_#{@key}")
      Rails.cache.delete("mount_#{@key}")
      Rails.cache.delete("hand_#{@key}")
      Rails.cache.delete("field_#{@key}")
    end

    def mount
      @mount = Rails.cache.fetch("mount_#{@key}") do
        deck
      end
    end

    def deck
      @decks = Rails.cache.fetch("deck_#{@key}") do
        Deck.where(:key => @key).all.shuffle
      end
    end

    def field
      @fields = Rails.cache.fetch("field_#{@key}") do
        []
      end
    end

    def hand
      @hand = Rails.cache.fetch("hand_#{@key}") do
        []
      end
    end

    def hand_delete(deck_id)
      Rails.cache.write "hand_#{@key}", hand.reject { |d| d.id == deck_id.to_i }
    end

    def field_delete(deck_id)
      Rails.cache.write "field_#{@key}", field.reject { |d| d.id == deck_id.to_i }
    end

    def move_field(deck_id)
      deck = hand[hand.map(&:id).index(deck_id.to_i)]
      Rails.cache.write "field_#{@key}", field + [deck]
      Rails.cache.write "hand_#{@key}", hand.reject { |d| d.id == deck_id.to_i }
    end

    def draw
      Rails.cache.write "hand_#{@key}", hand + [mount[0]]
      Rails.cache.write "mount_#{@key}", mount[1, mount.size - 1]
    end
  end

  before_filter do
    @target = FieldInfo.new("target")
    @my = FieldInfo.new("my")
  end

  def reset
    @target.reset
    @my.reset
    render :action => :index
  end

  def draw
    case params[:type]
    when "my"
      @my.draw
    when "target"
      @target.draw
    end
    render :action => :index
  end

  def move_field
    case params[:type]
    when "my"
      @my.move_field(params[:id])
    when "target"
      @target.move_field(params[:id])
    end
    render :action => :index
  end

  def delete_hand
    case params[:type]
    when "my"
      @my.hand_delete(params[:id])
    when "target"
      @target.hand_delete(params[:id])
    end
    render :action => :index
  end

  def delete_field
    case params[:type]
    when "my"
      @my.field_delete(params[:id])
    when "target"
      @target.field_delete(params[:id])
    end
    render :action => :index
  end
end
