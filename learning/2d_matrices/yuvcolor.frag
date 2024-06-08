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

mat3 yuv2rgb = mat3(1.,.0,1.13983,
                    1.,-.39465,-.58060,
                    1.,2.03211,.0);

mat3 rgb2yuv = mat3(.2125,.7152,.0722,-.09991,-.33609,.43600,.615,-.5586,-.05639);

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  st.x *= u_resolution.x/u_resolution.y;
  st = (st-.5)*2.;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  color = yuv2rgb * vec3(.5,st.x,st.y);
  

  gl_FragColor = vec4(color, alpha);
}
