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

float circleSDF(vec2 st) {
  return length(st-.5)*2.;
}
float triSDF(vec2 st) {
  st = (st*2.-1.)*2.;
  return max(abs(st.x)*.866025+st.y*.5,-st.y*.5);
}
float stroke(in float x_coor, float s, float width){
  float d = step(s,x_coor+width*.5)-step(s,x_coor-width*.5);
  return clamp(d, 0.,1.);
}
float fill(float x, float size) {
  return 1.-step(size, x);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  float circle = circleSDF(st-vec2(.0,.1));
  float triangle = triSDF(st+vec2(.0,.1));
  color += stroke(circle,.45,.1);
  //good way to disable colors in a space. since mult 1. gives the og value but mult .0 sets to 0
  color *= step(.55,triangle);
  color += fill(triangle,.45);

  

  gl_FragColor = vec4(color, alpha);
}
