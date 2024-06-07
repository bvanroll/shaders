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


void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;

  float d = 0.;
  //remaps to -1 - 1;
  st = st*2.-1.;

  d = length(abs(st)-.3);
  d = length(min(abs(st)-.3,0.));
  d = length(max(abs(st)-.3,0.));
  //color += fract(d*10.);
  //color += vec3(step(.3,d));
  //color += vec3(step(.3,d)*step(d,.4));
  color += vec3(smoothstep(.3,.4,d)*smoothstep(.6,.5,d));

  

  gl_FragColor = vec4(color, alpha);
}
