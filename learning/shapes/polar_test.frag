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

float circleSDF(vec2 st) { return length(st)*2.; }

float rectSDF(vec2 st, vec2 s) {
  st = st;
  return max(abs(st.x/s.x),abs(st.y/s.y));
}

float stroke(in float x_coor, float s, float width){
  float d = step(s,x_coor+width*.5)-step(s,x_coor-width*.5);
  return clamp(d, 0.,1.);
}

float polySDF(vec2 st, float angles) {
//  st = st*2.-1.;
  float a = atan(st.x,st.y)+PI;
  float r = length(st);
  float v = (2.*PI)/angles;
  return cos(floor(.5+a/v)*v-a)*r;
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  st *= u_resolution.x/u_resolution.y;
  st = (st - .5)*2.;
  vec3 color = vec3(0.0,0.0,0.0);
  vec2 m = u_mouse.xy/u_resolution.xy;
  m *= u_resolution.x/u_resolution.y;
  m = abs(m);
  float alpha = 1.0;
  float fq = 2.;
  float pos = radians(dot(m,m)*360.);
  float c = circleSDF(st);
  float r = rectSDF(st, vec2(1.));
  float a = atan(st.y,st.x);
  float f = (cos(a*fq+pos)/2.+.5)*.1;
  float s = polySDF(st, 6.);
  //a = abs(cos(a+u_time))*.1;
  //a = mix(a, .1, sin(u_time));
  color += stroke(s,.5,.1+f);
  //color += c;
  
  gl_FragColor = vec4(color, alpha);
}
