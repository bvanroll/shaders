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

vec2 rotate(vec2 st, float a) {
  st = mat2(cos(a),-sin(a),sin(a),cos(a))*(st);
  return st;
}

vec2 scale(vec2 st, vec2 scale) {
  return mat2(scale.x,.0,.0,scale.y)*st;
}

float fill(float x, float size) { return 1.-step(size, x); }

float crossSDF(vec2 st, float s) {
  vec2 size = vec2(.25, s);
  float a = max(abs(st.x/size.x),abs(st.y/size.y));
  float b = max(abs(st.x/size.y),abs(st.y/size.x));
  return min(a,b);
}


void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  st.x *= u_resolution.x/u_resolution.y;
  st = (st-.5)*2.;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  st += vec2(sin(u_time),cos(u_time))*.35;
  st = scale(st, vec2(sin(u_time),sin(u_time)));
  st = rotate(st,sin(u_time));
  float c = crossSDF(st,1.);
  
  color = vec3(st.x,st.y,.0);
  color += fill(c,.2);
  

  gl_FragColor = vec4(color, alpha);
}
