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

float rectSDF(vec2 st, vec2 s) {
  st = st*2.-1.;
  return max(abs(st.x/s.x),abs(st.y/s.y));
}

float fill(float x, float size) {
  return 1.-step(size, x);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  st = rotate(st, radians(-45.));
  vec2 size = vec2(1.);
  vec2 off = vec2(-0.02,.02);
  color += fill(rectSDF(st+off, size),.3);
  color += fill(rectSDF(st-off, size),.3);
  color *= (1.-fill(rectSDF(st-off, size),.29));
   //color *= step(.38,rectSDF(st-off,size));

  gl_FragColor = vec4(color, alpha);
}
