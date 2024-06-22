#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

const vec3 uAColor = vec3(.5,.5,.5);
const vec3 uBColor = vec3(.5,.5,.5);
const vec3 uCColor = vec3(1.,1.,1.);
const vec3 uDColor = vec3(.0,.33,.67);

//get colors from http://dev.thi.ng/gradients/
vec3 cosPalette(float t) { return uAColor + uBColor*cos(6.28318*(uCColor*t+uDColor)); }


void main() {
  vec2 st = (gl_FragCoord.xy*2. - u_resolution.xy)/u_resolution.y;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;

  

  gl_FragColor = vec4(color, alpha);
}
