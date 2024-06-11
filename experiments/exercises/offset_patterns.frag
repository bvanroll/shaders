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

float circleSDF(vec2 st) { return length(st); }

void main() {
  vec2 st = (gl_FragCoord.xy*2. - u_resolution.xy)/u_resolution.y;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  float sp = u_time/8.;
  float m = step(mod(sp*10.,2.),1.);
  vec2 st2 = st;
  //vec2 st2 = fract(st*10.)-.5;
  vec2 u = vec2(1.);
  u.x = step(mod(st2.y*10.,2.),1.)*2.-1.;
  u.y = step(mod(st2.x*10.,2.),1.)*2.-1.;
  st2.x += u.x*fract(sp*m);
  st2.y += u.y*fract(sp*(1.-m));
  st2 = fract(st2*10.)-.5;
  st2 *= 2.;
  float circle = (circleSDF(st2));
  float circle2 = (circle);
  color += fill(circle,.2);
  color += fill(min(circle,circle2),.5);

  gl_FragColor = vec4(color, alpha);
}
