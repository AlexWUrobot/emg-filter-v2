
/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

let ave = 0
let sum = 0
let list: number[] = []
let EMG_code = 0  // Change the EMG name to EMG_code so student's variable will not have conflict
for (let index = 0; index <= 100; index++) {
    EMG_code = pins.analogReadPin(AnalogPin.P3)
    //list.push(0)
    list.push(EMG_code)
}

let angle = 60
let max_angle = 160
let min_angle = 20
servos.P0.setAngle(angle)

// function pins.analogReadPin(name: AnalogPin): number;
/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    /**
     * Use dynamic average window to filter EMG signal from Pin P3
     */
    //% block="EMG_filtered in the windows size %window_size by pin %pin_name"
    export function EmgFilter(window_size: number, pin_name: AnalogPin): number {
        // Add code here
        EMG_code = pins.analogReadPin(pin_name)
        list.unshift(EMG_code)
        list.removeAt(window_size)
        sum = 0
        for (let index = 0; index <= window_size; index++) {
            sum = sum + list[index]
        }
        ave = sum / window_size
        return ave
    }

    /**
     * Address motor rotation direction and speed by acceleration
     */
    //% block="set P0 servo rotates in the direction %direction by %speed (ms) interval"
    export function SetTurnSpeed(direction: number, speed: number): void {
        if (Math.abs(direction) >= 100) {
            if (direction <= 0) {
                angle = angle - 3
            } else {
                angle = angle + 3
            }
            if (angle <= min_angle) {
                angle = min_angle
            }
            if (angle >= max_angle) {
                angle = max_angle
            }
            servos.P0.setAngle(angle)
        }
        basic.pause(speed)
    }
}
