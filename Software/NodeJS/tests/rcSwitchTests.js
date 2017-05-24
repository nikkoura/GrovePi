var GrovePi = require('../libs').GrovePi
var Commands = GrovePi.commands
var Board = GrovePi.board
var RFLinkRCSwitchTX = GrovePi.sensors.RFLinkRCSwitchTX

var board

function start() {
  console.log('starting')

  board = new Board({
    debug: true,
    onError: function(err) {
      console.log('TEST ERROR')
      console.log(err)
    },
    onInit: function(res) {
      if (res) {
        var rcSwitchTX = new RFLinkRCSwitchTX(3)
        rcSwitchTX.sendTypeB(rcSwitchTX.COMMAND_ON, 2, 1)
      } else {
          console.log('TEST CANNOT START')
      }
    }
  })
  board.init()
}

function onExit(err) {
  console.log('ending')
  board.close()
  process.removeAllListeners()
  process.exit()
  if (typeof err != 'undefined')
    console.log(err)
}

// starts the test
start()
// catches ctrl+c event
process.on('SIGINT', onExit)
