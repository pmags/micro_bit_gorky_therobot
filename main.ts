// Confirms that service is on and connected
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Chase), music.PlaybackMode.UntilDone)
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
        music.stopAllSounds()
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.analogWritePin(AnalogPin.P14, 1000)
        pins.analogWritePin(AnalogPin.P16, 1000)
        pins.digitalWritePin(DigitalPin.P13, 0)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.UntilDone)
    } else if (receivedString == "down") {
        basic.showLeds(`
            . . . . .
            # # # # #
            . # . # .
            . . # . .
            . . . . .
            `)
        music.stopAllSounds()
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.analogWritePin(AnalogPin.P15, 1000)
        pins.analogWritePin(AnalogPin.P13, 1000)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.UntilDone)
    } else if (receivedString == "right") {
        basic.showLeds(`
            . . # . .
            . . # # .
            . . # . #
            . . # # .
            . . # . .
            `)
        music.stopAllSounds()
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.analogWritePin(AnalogPin.P14, 900)
        pins.analogWritePin(AnalogPin.P16, 300)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Funk), music.PlaybackMode.UntilDone)
    } else if (receivedString == "left") {
        basic.showLeds(`
            . . # . .
            . # # . .
            # . # . .
            . # # . .
            . . # . .
            `)
        music.stopAllSounds()
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.analogWritePin(AnalogPin.P14, 300)
        pins.analogWritePin(AnalogPin.P16, 900)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Birthday), music.PlaybackMode.UntilDone)
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
music.setVolume(255)
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.UntilDone)
receivedString = "0"
