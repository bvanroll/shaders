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

vec2 rotate(vec2 st, float a) {
  return mat2(cos(a),-sin(a),sin(a),cos(a))*(st);
}

float starSDF(vec2 st, float V, float s) {
  st = st*4.;
  float a = atan(st.y, st.x)/(2.*3.14159265359);
  float seg = a * V;
  a = ((floor(seg) + .5)/V + mix(s, -s,step(.5,fract(seg)))) * (2.*3.14159265359);
  return abs(dot(vec2(cos(a),sin(a)),st));
      
}

float fill(float x, float size) { return 1.-step(size, x); }

float polySDF(vec2 st, float angles) {
  float a = atan(st.x,st.y)+PI;
  float r = length(st);
  float v = (2.*PI)/angles;
  return cos(floor(.5+a/v)*v-a)*r;
}

float stroke(in float x_coor, float s, float width){
  float d = step(s,x_coor+width*.5)-step(s,x_coor-width*.5);
  return clamp(d, 0.,1.);
}

// i got lazy
void main() {
  vec2 st = (gl_FragCoord.xy*2. - u_resolution.xy)/u_resolution.y;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  float bg = starSDF(st, 16., .1);
  color += fill(bg,1.3);
  float l = 0.;
  for (float i = 0.; i< 8.; i++) {
    vec2 xy = rotate(st, radians(180./4.)*i);
    xy.y -= .3;
    float tri = polySDF(xy, 3.);
    color += fill(tri, .3);
    l += stroke(tri, .3, .03);
  }
  color *= 1.-l;
  float c = polySDF(st, 8.);
  color -= stroke(c, .15, .04);
  

  gl_FragColor = vec4(color, alpha);
}
