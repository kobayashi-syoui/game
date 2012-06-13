function GameSocket(server)
{
  var ws = new WebSocket(server);

  ws.onmessage = function(event)
  {
    var json = eval('(' + event.data + ')');

    switch (json.type)
    {
      // プレイヤー情報要求 応答
      case 'RES_PLAYER_INFO':
        var player = new Player();
        player.name = json["name"];
        player.hp = parseInt(json["hp"]);
        player.mp = parseInt(json["mp"]);
        alert("name:" + player.name + " hp:" + player.hp + " mp:" + player.mp);
        break;
      case 'CHAT':
        var obj = $("#history");
        obj.text(obj.text() + "\n" + json.message);
        break;
      default:
        alert("不正なデータです。");
        break;
    }
  }

  // チャット送信
  this.chat = function(message)
  {
    sock.send("CHAT", {"message": message});
  }

  // ユーザ情報の取得
  this.player_find = function(id)
  {
    sock.send("REQ_PLAYER_INFO", {"id": id});
  }

  this.send = function(type, params)
  {
    var json = {"type": type, "params": params};
    ws.send(JSON.stringify(json));
  }
}

function Player()
{
  this.name = "";
  this.hp = 0;
  this.mp = 0;
}
