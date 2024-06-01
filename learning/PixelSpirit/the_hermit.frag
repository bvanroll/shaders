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

float triSDF(vec2 st) {
  st = (st*2.-1.)*2.;
  return max(abs(st.x)*.866025+st.y*.5,-st.y*.5);
}

float rhombSDF(vec2 st) {
  vec2 st1 = (st*2.-1.)*2.;
  vec2 st2 = (vec2(st.x,1.-st.y)*2.-1.)*2.;
  float triangle1 = max(abs(st1.x)*.866025+st1.y*.5,-st1.y*.5);
  float triangle2 = max(abs(st2.x)*.866025+st2.y*.5,-st2.y*.5);
  return max(triangle1, triangle2);
}

float fill(float x, float size) {
  return 1.-step(size, x);
}

float flip(float v, float pct) {
  return mix(v, 1.-v, pct);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;

  float tri = fill(triSDF(st),.5);
  float rhomb = fill(rhombSDF(st),.4);
  color += flip(rhomb,tri);
  gl_FragColor = vec4(color, alpha);
}
