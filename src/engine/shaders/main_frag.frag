varying lowp vec4 vColor;

void main() {
  gl_FragColor = floor(vColor * 10.0) / 10.0;
}