#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  // vec3 color = vec3(0.0,0.0,0.0);

  float pct = distance(gl_FragCoord.xy, (vec2(0.5)*u_resolution)) // find a way to make this a circle even when non 1:1 aspect ratio
  vec3 color = vec3(pct);
  gl_FragColor = vec4(color, 1.0);
}
