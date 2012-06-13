# coding: utf-8

class TopsController < ApplicationController
  class Message
    def initialize(my, other)
      @my = my
      @other = other
    end

    def announce(text)
      @other.each do |id|
        $redis.rpush(id, text)
      end
    end

    def get
      $redis.lpop(@my)
    end

    def list(id=@my)
      $redis.lrange id, 0, -1
    end
  end

  def index
  end

  def pjax
  end

  def js
    i = 0
    s = params[:s].to_i
    t = params[:t].to_i

    mes = Message.new s, [t] 

    # メッセージ送ってない時だけ
    mes.announce("#{s} is Login") if mes.list(t).size == 0

    ret = mes.get || "No"
    render :json => {:result => ret}.to_json
  end
end
