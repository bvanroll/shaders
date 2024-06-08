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

float crossSDF(vec2 st, float s) {
  vec2 size = vec2(.25, s);
  float rect1 = max(abs(st.x/size.x),abs(st.y/size.y));
  float rect2 = max(abs(st.x/size.y),abs(st.y/size.x));
  return min(rect1,rect2);
}

float fill(float x, float size) { return 1.-step(size, x); }

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  st.x *= u_resolution.x/u_resolution.y;
  st = (st-.5)*2.;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  
  vec2 translate = vec2(0.,sin(u_time));
  st += translate*.35;
  color = vec3(st.x,st.y,.0);
  color += fill(crossSDF(st,1.),.2+(cos(u_time*2.)*.1));
  gl_FragColor = vec4(color, alpha);
}
