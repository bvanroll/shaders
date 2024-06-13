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

vec2 brickTile(vec2 st, float zoom) {
  st *= zoom;
  st.x += step(1., mod(st.y,2.)) * .5;
  return fract(st);
}

float rectSDF(vec2 st, vec2 s) {
  return max(abs(st.x/s.x),abs(st.y/s.y));
}

void main() {
  vec2 st = (gl_FragCoord.xy*2. - u_resolution.xy)/u_resolution.y;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  
  st = brickTile(st, 5.) - .5;
  color += rectSDF(st, vec2(1.));
  

  gl_FragColor = vec4(color, alpha);
}
