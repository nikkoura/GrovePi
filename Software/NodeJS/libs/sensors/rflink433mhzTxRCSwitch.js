var DigitalSensor = require('./base/digitalSensor')
var commands     = require('../commands')

function RFLink433mhzTxRCSwitch(pin) {
  DigitalSensor.apply(this, Array.prototype.slice.call(arguments))
}
RFLink433mhzTxRCSwitch.prototype = new DigitalSensor()

RFLink433mhzTxRCSwitch.prototype.TYPE_A = 0
RFLink433mhzTxRCSwitch.prototype.TYPE_B = 1
RFLink433mhzTxRCSwitch.prototype.TYPE_C = 2
RFLink433mhzTxRCSwitch.prototype.TYPE_D = 3

RFLink433mhzTxRCSwitch.prototype.COMMAND_ON = 1
RFLink433mhzTxRCSwitch.prototype.COMMAND_OFF = 0

RFLink433mhzTxRCSwitch.prototype.init = function() {
  this.board.pinMode(this.board.OUTPUT)
}

RFLink433mhzTxRCSwitch.prototype.sendTypeA = function(command, group, device) {
    this.board.pinMode(this.board.OUTPUT)
    var write = this.board.writeBytes(commands.rcSwitch433mhzTXsend.concat([
        this.TYPE_A * 64 + command * 32 + this.pin - 2,
        parseInt(group, 2),
        parseInt(device, 2)]))
    if (write) {
        this.board.wait(500)
        return true
    } else {
        return false
    }
}

RFLink433mhzTxRCSwitch.prototype.sendTypeB = function(command, group, device) {
  this.board.pinMode(this.board.OUTPUT)
  var write = this.board.writeBytes(commands.rcSwitch433mhzTXsend.concat([
      this.TYPE_B * 64 + command * 32 + this.pin - 2,
      group,
      device]))
  if (write) {
    this.board.wait(500)
    return true
  } else {
    return false
  }
}

RFLink433mhzTxRCSwitch.prototype.sendTypeC = function(command, family, group, device) {
    this.board.pinMode(this.board.OUTPUT)
    var write = this.board.writeBytes(commands.rcSwitch433mhzTXsend.concat([
        this.TYPE_C * 64 + command * 32 + this.pin - 2,
        family.charCodeAt(),
        (group - 1) * 4 + (device - 1)]))
    if (write) {
        this.board.wait(500)
        return true
    } else {
        return false
    }
}

RFLink433mhzTxRCSwitch.prototype.sendTypeD = function(command, family, device) {
    this.board.pinMode(this.board.OUTPUT)
    var write = this.board.writeBytes(commands.rcSwitch433mhzTXsend.concat([
        this.TYPE_D * 64 + command * 32 + this.pin - 2,
        family.charCodeAt(),
        device]))
    if (write) {
        this.board.wait(500)
        return true
    } else {
        return false
    }
}

module.exports = RFLink433mhzTxRCSwitch