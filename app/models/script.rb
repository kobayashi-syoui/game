# coding: utf-8

class Script < ActiveRecord::Base
  # associations

  # validations
  validates :name, :key, :presence => true
end
