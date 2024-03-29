// Confirms that service is on and connected
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
// Initiates service
bluetooth.startUartService()
basic.showIcon(IconNames.Square)
basic.forever(function () {
	
})
