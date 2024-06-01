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

float fill(float x, float size) {
  return 1.-step(size, x);
}
//wtf even
float triSDF(vec2 st) {
  st = (st*2.-1.)*2.;
  return max(abs(st.x)*.866025+st.y*.5,-st.y*.5);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  st.y = 1.-st.y;
  vec2 ts = vec2(st.x,.82-st.y);
  color += fill(triSDF(st), .7);
  color -= fill(triSDF(ts), .36);


  

  gl_FragColor = vec4(color, alpha);
}
