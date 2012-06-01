class WsServer
  # autoload書かなくてもネストしたクラスを読み込む方法がないだろうか・・・
  autoload :Card, "#{Rails.root}/app/ws_server/card"
  attr_accessor :type

  module Type
    REQUEST_PLAYER_INFO = "REQ_PLAYER_INFO"
    RESPONSE_PLAYER_INFO = "RES_PLAYER_INFO"
  end
end
