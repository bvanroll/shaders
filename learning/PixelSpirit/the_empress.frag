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

float fill(float x, float size) { return 1.-step(size, x); }

float polySDF(vec2 st, float angles) {
  st = st*2.-1.;
  float a = atan(st.x,st.y)+PI;
  float r = length(st);
  float v = (2.*PI)/angles;
  return cos(floor(.5+a/v)*v-a)*r;
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  float d1 = polySDF(st,5.);
  vec2 ts = vec2(st.x,1.-st.y); //flips the y coords, interesting name btw
  float d2 = polySDF(ts,5.);
  //color += fract(d1*3.);
  color += fill(d1,.75)*fill(fract(d1*5.),.5);
  color -= fill(d1,.6)*fill(fract(d2*4.9),.45);
  //color = vec3(fill(fract(d1*10.),.5));
  
  gl_FragColor = vec4(color, alpha);
}
