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

float rectSDF(vec2 st, vec2 s) {
  st = st*2.-1.;
  return max(abs(st.x/s.x),abs(st.y/s.y));
}

float crossSDF(vec2 st, float s) {
  vec2 size = vec2(.25, s);
  return min(rectSDF(st,size.xy),rectSDF(st,size.yx));
}

float fill(float x, float size) {
  return 1.-step(size, x);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  float rect = rectSDF(st,vec2(1.));
  color += fill(rect,.5);
  float cross = crossSDF(st,1.);
  //i don't understand what happens here
  //it has to be fract causing this to look like that
  color *= step(.5,fract(cross*4.));
  
  gl_FragColor = vec4(color, alpha);
}
