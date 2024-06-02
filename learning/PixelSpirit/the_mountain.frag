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

float rectSDF(vec2 st, vec2 s) {
  st = st*2.-1.;
  return max(abs(st.x/s.x),abs(st.y/s.y));
}

vec2 rotate(vec2 st, float a) {
  st = mat2(cos(a),-sin(a),sin(a),cos(a))*(st-.5);
  return st+.5;
}

float fill(float x, float size) {
  return 1.-step(size, x);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  // probably super inefficient/complicated
  //st = rotate(st, radians(45.));
  //float r1 = fill(rectSDF(st, vec2(1.,1.)),.3);
  //float r1_bord = 1.-fill(rectSDF(st, vec2(1.,1.)),.35)-r1;
  //float r2 = fill(rectSDF(st+vec2(-.12,.12),vec2(1.,1.)),.2);
  //float r3 = fill(rectSDF(st+vec2(.12,-.12),vec2(1.,1.)),.2);
  //color += r2+r3;
  //color *= (r1_bord+r1);
  //color += r1;
  st = rotate(st, radians(-45.));
  float off = .12;
  vec2 s = vec2(1.);
  color += fill(rectSDF(st+off,s),.2);
  color += fill(rectSDF(st-off,s),.2);
  float r = rectSDF(st,s);
  color *= step(.33,r);
  color += fill(r,.3);
  // yep this step trick is way better then the fuckery i was doing
  gl_FragColor = vec4(color, alpha);
}
