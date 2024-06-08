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


mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle));
}

float crossSDF(vec2 st, float s) {
  vec2 size = vec2(.25, s);
  float a = max(abs(st.x/size.x),abs(st.y/size.y));
  float b = max(abs(st.x/size.y),abs(st.y/size.x));
  return min(a,b);
}

float fill(float x, float size) { return 1.-step(size, x); }

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  st.x *= u_resolution.x/u_resolution.y;
  st = (st-.5)*2.;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  vec2 translate = vec2(cos(u_time),sin(u_time)); 
  //move before rotate. i would've thought the opposite
  st = st - translate*.35;
  st = rotate2d(sin(u_time)*PI) * st;
  //color = vec3(st.x,st.y,.0);
  color += fill(crossSDF(st,1.),.3);
  

  gl_FragColor = vec4(color, alpha);
}
