var DigitalSensor = require('./base/digitalSensor')
var commands     = require('../commands')

function RFLink433mhzRxRCSwitch(pin) {
  DigitalSensor.apply(this, Array.prototype.slice.call(arguments))
}
RFLink433mhzRxRCSwitch.prototype = new DigitalSensor()

RFLink433mhzRxRCSwitch.prototype.TYPE_A = 0
RFLink433mhzRxRCSwitch.prototype.TYPE_B = 1
RFLink433mhzRxRCSwitch.prototype.TYPE_C = 2
RFLink433mhzRxRCSwitch.prototype.TYPE_D = 3

RFLink433mhzRxRCSwitch.prototype.STATE_ON = 1
RFLink433mhzRxRCSwitch.prototype.STATE_OFF = 0
RFLink433mhzRxRCSwitch.prototype.STATE_UNKNOWN = 255


RFLink433mhzRxRCSwitch.prototype.init = function() {
  this.board.pinMode(this.board.OUTPUT)
}

RFLink433mhzRxRCSwitch.prototype.subscribeTypeA = function(subscriptionNumber, group, device, initialState) {
    this.board.pinMode(this.board.OUTPUT)
    var write = this.board.writeBytes(commands.rcSwitch433mhzRXsubscribe.concat([
        this.TYPE_A * 64 + initialState * 32 + subscriptionNumber * 2 + this.pin - 2,
        parseInt(group, 2),
        parseInt(device, 2)]))
    if (write) {
        this.board.wait(500)
        return true
    } else {
        return false
    }
}

RFLink433mhzRxRCSwitch.prototype.subscribeTypeB = function(subscriptionNumber, group, device, initialState) {
  this.board.pinMode(this.board.OUTPUT)
  var write = this.board.writeBytes(commands.rcSwitch433mhzRXsubscribe.concat([
      this.TYPE_B * 64 + initialState * 32 + subscriptionNumber * 2 + this.pin - 2,
      group,
      device]))
  if (write) {
    this.board.wait(500)
    return true
  } else {
    return false
  }
}

RFLink433mhzRxRCSwitch.prototype.subscribeTypeC = function(subscriptionNumber, family, group, device, initialState) {
    this.board.pinMode(this.board.OUTPUT)
    var write = this.board.writeBytes(commands.rcSwitch433mhzRXsubscribe.concat([
        this.TYPE_C * 64 + initialState * 32 + subscriptionNumber * 2 + this.pin - 2,
        family.charCodeAt(),
        (group - 1) * 4 + (device - 1)]))
    if (write) {
        this.board.wait(500)
        return true
    } else {
        return false
    }
}

RFLink433mhzRxRCSwitch.prototype.subscribeTypeD = function(subscriptionNumber, family, device, initialState) {
    this.board.pinMode(this.board.OUTPUT)
    var write = this.board.writeBytes(commands.rcSwitch433mhzTXsend.concat([
        this.TYPE_D * 64 + initialState * 32 + subscriptionNumber * 2 + this.pin - 2,
        family.charCodeAt(),
        device]))
    if (write) {
        this.board.wait(500)
        return true
    } else {
        return false
    }
}

RFLink433mhzRxRCSwitch.prototype.readSubscription = function(subscriptionNumber) {
    this.board.pinMode(this.board.OUTPUT)
    var write = this.board.writeBytes(commands.rcSwitch433mhzRXread.concat([subscriptionNumber * 2, 0, 0]))
    if (write) {
        this.board.wait(200)
        this.board.readByte()
        var bytes = this.board.readBytes()
        if (bytes instanceof Buffer)
            return (bytes[1])
        else
            return false
    } else {
        return false
    }
}

module.exports = RFLink433mhzRxRCSwitch