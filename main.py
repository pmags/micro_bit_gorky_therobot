# Confirms that service is on and connected

def on_bluetooth_connected():
    basic.show_icon(IconNames.HAPPY)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    basic.show_icon(IconNames.NO)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def on_uart_data_received():
    global receivedString
    receivedString = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
    if receivedString == "0":
        basic.show_icon(IconNames.HAPPY)
        music._play_default_background(music.built_in_playable_melody(Melodies.JUMP_UP),
            music.PlaybackMode.UNTIL_DONE)
        pins.digital_write_pin(DigitalPin.P13, 0)
        pins.digital_write_pin(DigitalPin.P15, 0)
        pins.analog_write_pin(AnalogPin.P14, 0)
        pins.analog_write_pin(AnalogPin.P16, 0)
    elif receivedString == "up":
        basic.show_icon(IconNames.TRIANGLE)
        pins.digital_write_pin(DigitalPin.P13, 0)
        pins.digital_write_pin(DigitalPin.P15, 0)
        pins.analog_write_pin(AnalogPin.P14, 1000)
        pins.analog_write_pin(AnalogPin.P16, 1000)
    elif receivedString == "down":
        basic.show_leds("""
            . . . . .
            # # # # #
            . # . # .
            . . # . .
            . . . . .
            """)
        pins.digital_write_pin(DigitalPin.P13, 1)
        pins.digital_write_pin(DigitalPin.P15, 1)
        pins.analog_write_pin(AnalogPin.P14, 1000)
        pins.analog_write_pin(AnalogPin.P16, 1000)
        music.play(music.string_playable("C D E F G A B C5 ", 120),
            music.PlaybackMode.IN_BACKGROUND)
    elif receivedString == "right":
        basic.show_leds("""
            . . # . .
            . . # # .
            . . # . #
            . . # # .
            . . # . .
            """)
        pins.digital_write_pin(DigitalPin.P13, 0)
        pins.digital_write_pin(DigitalPin.P15, 0)
        pins.analog_write_pin(AnalogPin.P14, 900)
        pins.analog_write_pin(AnalogPin.P16, 300)
    elif receivedString == "left":
        basic.show_leds("""
            . . # . .
            . # # . .
            # . # . .
            . # # . .
            . . # . .
            """)
        pins.digital_write_pin(DigitalPin.P13, 0)
        pins.digital_write_pin(DigitalPin.P15, 0)
        pins.analog_write_pin(AnalogPin.P14, 300)
        pins.analog_write_pin(AnalogPin.P16, 900)
    else:
        pins.digital_write_pin(DigitalPin.P13, 0)
        pins.digital_write_pin(DigitalPin.P15, 0)
        pins.analog_write_pin(AnalogPin.P14, 0)
        pins.analog_write_pin(AnalogPin.P16, 0)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.NEW_LINE),
    on_uart_data_received)

"""

Initiates service

"""
receivedString = ""
bluetooth.start_uart_service()
basic.show_icon(IconNames.SQUARE)
music.set_built_in_speaker_enabled(True)
music._play_default_background(music.built_in_playable_melody(Melodies.POWER_UP),
    music.PlaybackMode.UNTIL_DONE)
receivedString = "0"