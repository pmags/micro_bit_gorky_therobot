// Confirms that service is on and connected
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (receivedString == "0") {
        basic.showIcon(IconNames.Happy)
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.analogWritePin(AnalogPin.P16, 0)
    } else if (receivedString == "up") {
        basic.showIcon(IconNames.Triangle)
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.analogWritePin(AnalogPin.P14, 1000)
        pins.analogWritePin(AnalogPin.P16, 1000)
    } else if (receivedString == "down") {
        basic.showLeds(`
            . . . . .
            # # # # #
            . # . # .
            . . # . .
            . . . . .
            `)
    } else if (receivedString == "right") {
        basic.showLeds(`
            . . # . .
            . . # # .
            . . # . #
            . . # # .
            . . # . .
            `)
    } else if (receivedString == "left") {
        basic.showLeds(`
            . . # . .
            . # # . .
            # . # . .
            . # # . .
            . . # . .
            `)
    } else {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.analogWritePin(AnalogPin.P16, 0)
    }
})
/**
 * Initiates service
 */
let receivedString = ""
bluetooth.startUartService()
basic.showIcon(IconNames.Square)
receivedString = "0"
