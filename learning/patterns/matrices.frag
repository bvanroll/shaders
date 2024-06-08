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

vec2 tile(vec2 st, float tiles) {return fract(st*tiles)-.5; }

vec2 rotate(vec2 st, float a) {
  return mat2(cos(a),-sin(a),sin(a),cos(a))*(st);
}

float rectSDF(vec2 st, vec2 s) {
  return max(abs(st.x/s.x),abs(st.y/s.y));
}

float fill(float x, float size) { return 1.-step(size, x); }

void main() {
  vec2 st = (gl_FragCoord.xy*2. - u_resolution.xy)/u_resolution.y;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  
  st = tile(st,1.);
  
  st = rotate(st, PI*.25);
  color += vec3(fill(rectSDF(st,vec2(1.)),.36));
  
  gl_FragColor = vec4(color, alpha);
}
