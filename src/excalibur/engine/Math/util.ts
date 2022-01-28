/**
https://raw.githubusercontent.com/excaliburjs/Excalibur/main/LICENSE.md

BSD 2-Clause License

Copyright (c) 2013, Erik Onarheim
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { Random } from './Random';

/**
 * Two PI constant
 */
export const TwoPI: number = Math.PI * 2;

/**
 * Returns the fractional part of a number
 * @param x
 */
export function frac(x: number): number {
  if (x >= 0) {
    return x - Math.floor(x);
  } else {
    return x - Math.ceil(x);
  }
}

/**
 * Returns the sign of a number, if 0 returns 0
 */
export function sign(val: number): number {
  if (val === 0) {
    return 0;
  }
  return val < 0 ? -1 : 1;
};

/**
 * Clamps a value between a min and max inclusive
 */
export function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(min, val), max);
}


/**
 * Convert an angle to be the equivalent in the range [0, 2PI]
 */
export function canonicalizeAngle(angle: number): number {
  let tmpAngle = angle;
  if (angle > TwoPI) {
    while (tmpAngle > TwoPI) {
      tmpAngle -= TwoPI;
    }
  }

  if (angle < 0) {
    while (tmpAngle < 0) {
      tmpAngle += TwoPI;
    }
  }
  return tmpAngle;
}

/**
 * Convert radians to degrees
 */
export function toDegrees(radians: number): number {
  return (180 / Math.PI) * radians;
}

/**
 * Convert degrees to radians
 */
export function toRadians(degrees: number): number {
  return (degrees / 180) * Math.PI;
}

/**
 * Generate a range of numbers
 * For example: range(0, 5) -> [0, 1, 2, 3, 4, 5]
 * @param from inclusive
 * @param to inclusive
 */
export const range = (from: number, to: number) => Array.from(new Array(to - from + 1), (_x, i) => i + from);

/**
 * Find a random floating point number in range
 */
export function randomInRange(min: number, max: number, random: Random = new Random()): number {
  return random ? random.floating(min, max) : min + Math.random() * (max - min);
}

/**
 * Find a random integer in a range
 */
export function randomIntInRange(min: number, max: number, random: Random = new Random()): number {
  return random ? random.integer(min, max) : Math.round(randomInRange(min, max));
}