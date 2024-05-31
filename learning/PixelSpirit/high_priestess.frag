#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

float stroke(in float x_coor, float s, float width){
  float d = step(s,x_coor+width*.5)-step(s,x_coor-width*.5);
  return clamp(d, 0.,1.);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  vec2 centre = vec2(.5);
  // this was my original solution, going to look over the stroke version on the card now
  //color += step(.25, distance(centre, st))-step(.27, distance(centre, st));
color += stroke(length(st-.5)*2.,.5,.05);
 
  gl_FragColor = vec4(color, alpha);
}
