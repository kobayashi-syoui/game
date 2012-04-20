class WsServer
  attr_accessor :type

  module Type
    REQUEST_PLAYER_INFO = "REQ_PLAYER_INFO"
    RESPONSE_PLAYER_INFO = "RES_PLAYER_INFO"
  end
end
