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
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.UntilDone)
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
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.analogWritePin(AnalogPin.P14, 1000)
        pins.analogWritePin(AnalogPin.P16, 1000)
        music.play(music.stringPlayable("C D E F G A B C5 ", 120), music.PlaybackMode.InBackground)
    } else if (receivedString == "right") {
        basic.showLeds(`
            . . # . .
            . . # # .
            . . # . #
            . . # # .
            . . # . .
            `)
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.analogWritePin(AnalogPin.P14, 900)
        pins.analogWritePin(AnalogPin.P16, 300)
    } else if (receivedString == "left") {
        basic.showLeds(`
            . . # . .
            . # # . .
            # . # . .
            . # # . .
            . . # . .
            `)
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.analogWritePin(AnalogPin.P14, 300)
        pins.analogWritePin(AnalogPin.P16, 900)
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
music.setBuiltInSpeakerEnabled(true)
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.UntilDone)
receivedString = "0"
