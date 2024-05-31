#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

float circleSDF(vec2 st) {
  return length(st-.5)*2.;
}


float fill(float x, float size) {
  return 1.-step(size, x);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  color += fill(circleSDF(st),.65);
  vec2 offset = vec2(.1,.05);
  color -= fill(circleSDF(st-offset),.5);

  

  gl_FragColor = vec4(color, alpha);
}
