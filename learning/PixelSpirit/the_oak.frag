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
vec3 cosPalette(float t) {
  return uAColor + uBColor*cos(6.28318*(uCColor*t+uDColor));
}

vec2 rotate(vec2 st, float a) {
  st = mat2(cos(a),-sin(a),sin(a),cos(a))*(st-.5);
  return st+.5;
}

float fill(float x, float size) {
  return 1.-step(size, x);
}

float flip(float v, float pct) {
  return mix(v, 1.-v, pct);
}

float rectSDF(vec2 st, vec2 s) {
  st = st*2.-1.;
  return max(abs(st.x/s.x),abs(st.y/s.y));
}

float stroke(in float x_coor, float s, float width){
  float d = step(s,x_coor+width*.5)-step(s,x_coor-width*.5);
  return clamp(d, 0.,1.);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  vec2 s = vec2(1.,1.);
  st = rotate(st, radians(-45.));
  float r1 = rectSDF(st,s);
  color += flip(fill(r1,.3),fill(r1,.28));
  float r2 = rectSDF(st+vec2(-.07,.07),s);
  color += stroke(r2, .15, .02);
  //color += flip(fill(r2,.15),fill(r2,.13));
  //float r3 = rectSDF(st+vec2(-.1,.1),s);
  //color += flip(fill(r3,.1),fill(r3,.08));
  gl_FragColor = vec4(color, alpha);
}
