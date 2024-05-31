#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

float squigly_line(in float midpoint, in float deviation, in vec2 st) {
  return step(midpoint+(cos(st.y*PI)*deviation),st.x)-step(midpoint+deviation+(cos(st.y*PI)*deviation),st.x);
}

float stroke(in float x_coor, float s, float width){
  float d = step(s,x_coor+width*.5)-step(s,x_coor-width*.5);
  return clamp(d, 0.,1.);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  float dev = .1;
  // stagger for .3 .5 and .7, since we don't want any chance of deviation overlap
  //color += squigly_line(.3, dev, st) + squigly_line(.5,dev,st)+squigly_line(.7,dev,st);

  // after finishing the high priestess decided to come back to this one and try using the stroke function again.
  float c = cos(st.y*PI)*dev;
  color += stroke(st.x,.35+c,.1)+stroke(st.x,.5+c,.1)+stroke(st.x,.65+c,.1);;

  

  gl_FragColor = vec4(color, alpha);
}
