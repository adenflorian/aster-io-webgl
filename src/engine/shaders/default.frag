precision mediump float;

uniform vec4 uColor;

varying vec4 vColor;

void main() {
  gl_FragColor = mix(vColor, uColor, uColor.a);
}