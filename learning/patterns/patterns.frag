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

float rhombSDF(vec2 st) {
  vec2 st1 = (st)*2.;
  vec2 st2 = (vec2(st.x,0.-st.y)*2.-1.)*2.;
  float triangle1 = max(abs(st1.x)*.866025+st1.y*.5,-st1.y*.5);
  float triangle2 = max(abs(st2.x)*.866025+st2.y*.5,-st2.y*.5);
  return max(triangle1, triangle2);
}

float fill(float x, float size) { return 1.-step(size, x); }

float circleSDF(vec2 st) { return length(st); }

float triSDF(vec2 st) {
  st = st*2.;
  return max(abs(st.x)*.866025+st.y*.5,-st.y*.5);
}

float rectSDF(vec2 st, vec2 s) {
  return max(abs(st.x/s.x),abs(st.y/s.y));
}

vec2 rotate(vec2 st, float a) {
  st = mat2(cos(a),-sin(a),sin(a),cos(a))*(st);
  return st;
}

vec2 tile(vec2 st, float tiles) {
  return fract(st*tiles)-.5;
}

float polySDF(vec2 st, float angles) {
  float a = atan(st.x,st.y)+PI;
  float r = length(st);
  float v = (2.*PI)/angles;
  return cos(floor(.5+a/v)*v-a)*r;
}

void main() {
  vec2 st = (gl_FragCoord.xy*2. - u_resolution.xy)/u_resolution.y;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  vec2 st2 = tile(st, 2.);
  st2 = rotate(st2, radians(30.*u_time));
  float a = atan(st2.y,st2.x);
  float fq = cos(a*2.+(st.x+st.y)/2.+u_time/2.);
  fq = 1.; 
  float c = fill(circleSDF(st2),.2+fq*.1);
  float t = fill(triSDF(st2),.2+fq*.1);
  float r = fill(rectSDF(st2, vec2(1.)),.2+fq*.1);
  float f = fill(polySDF(st2, 5.),.2+fq*.1);
  
  color += c*step(st.x,.0)*step(st.y,.0);
  color += f*step(st.x,.0)*step(.0,st.y);
  color += t*step(0.,st.x)*step(st.y,.0);
  color += r*step(.0,st.x)*step(.0,st.y);
  gl_FragColor = vec4(color, alpha);
}
