#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

vec4 col() {
  float r = abs(sin(u_time));
  float g = abs(cos(u_time/2.0));
  float b = abs(tan(u_time/3.0));
  return vec4(r, g, b, 1.0);
}

void main() {
  gl_FragColor = vec4(col());
}

