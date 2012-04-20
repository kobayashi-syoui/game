#!/usr/bin/env ruby
#require 'rubygems'
#require 'em-websocket'

connections = Array.new

=begin
Thread.new do
  while true do
    sleep 0.001
  end
end
=end

EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 8080, :debug => !Rails.env.production?) do |ws|
  ws.onopen { 
    connections.push(ws) unless connections.index(ws)
    p "start"
  }

  ws.onmessage {|msg|
    json = ActiveSupport::JSON.decode(msg)
    case json["type"]
    when WsServer::Type::REQUEST_PLAYER_INFO
      ws.send({:type => WsServer::Type::RESPONSE_PLAYER_INFO,
               :hp => 100,
               :mp => 100,
               :name => Account.find(json["params"]["id"]).name}.to_json)
    when "CHAT"
      connections.each do |con|
        con.send({:type => "CHAT",
                  :message => json["params"]["message"]}.to_json)
      end
    end
    #connections.each {|con| con.send(msg) unless con == ws} 
  }

  ws.onclose {
    p "end"
    connections.delete_if{|con| con == ws} 
  }
end

