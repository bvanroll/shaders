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

float starSDF(vec2 st, int V, float s) {
  st = st*4.-2.;
  float a = atan(st.y, st.x)/(2.*PI);
  float seg = a * float(V);
  a = ((floor(seg) + .5)/float(V)+mix(s,-s,step(.5,fract(seg))))*(2.*PI);
  return abs(dot(vec2(cos(a),sin(a)),st));
}

float stroke(in float x_coor, float s, float width){
  float d = step(s,x_coor+width*.5)-step(s,x_coor-width*.5);
  return clamp(d, 0.,1.);
}

float circleSDF(vec2 st) { return length(st-.5)*2.; }

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  color += stroke(circleSDF(st),.8,.05);
  st.y = 1.-st.y;
  float s = starSDF(st.yx,5,.1);
  color *= step(.7,s);
  color += stroke(s,.4,.1);
  

  gl_FragColor = vec4(color, alpha);
}
