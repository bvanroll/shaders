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

float random (in vec2 _st) {
  return fract(sin(dot(_st.xy, vec2(12.9898, 78.233))));
}

vec2 truchetPattern(in vec2 _st, in float _index) {
  _index = fract(((_index-.5)*2.));
  if (_index > .75) {
    _st = vec2(1.0) - _st;
   } else if (_index > .5) {
     _st = vec2(1.0-_st.x, _st.y);
   } else if (_index > .25) {
     _st = 1.0-vec2(1.0-_st.x, _st.y);
   }
  return _st;
}

void main() {
  //vec2 st = (gl_FragCoord.xy*2. - u_resolution.xy)/u_resolution.y;
  vec2 st = (gl_FragCoord.xy / u_resolution.xy);
  st *= 10.;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  // st = (st-vec2(5.))*(abs(sin(u_time*.2))*5.);
  // st.x += u_time*3.;

  vec2 ipos = floor(st);
  vec2 fpos = fract(st);


  vec2 tile = truchetPattern(fpos, random(ipos));

  color += smoothstep(tile.x-.3,tile.x,tile.y)-smoothstep(tile.x,tile.x+0.3,tile.y);
  

  gl_FragColor = vec4(color, alpha);
}
