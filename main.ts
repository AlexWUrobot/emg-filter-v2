basic.forever(function () {
    led.plotBarGraph(
    custom.EmgFilter(15, AnalogPin.P10),
    1023
    )
})
