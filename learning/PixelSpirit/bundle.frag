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

float hexSDF(vec2 st) {
  st = abs(st*2.-1.);
  return max(abs(st.y),st.x*.866025+st.y*.5);
}

float stroke(in float x_coor, float s, float width){
  float d = step(s,x_coor+width*.5)-step(s,x_coor-width*.5);
  return clamp(d, 0.,1.);
}

float fill(float x, float size) { return 1.-step(size, x); }

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  st = st.yx;
  color += stroke(hexSDF(st),.6,.1);
  color += fill(hexSDF(st-vec2(-.06,-.1)),.15);
  color += fill(hexSDF(st-vec2(-.06,.1)),.15);
  color += fill(hexSDF(st-vec2(.11,.0)),.15);
  

  gl_FragColor = vec4(color, alpha);
}
