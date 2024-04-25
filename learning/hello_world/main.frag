#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;



vec4 col() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec2 mt = u_mouse/u_resolution;
  
  

  // vec2 distanceVector = st-mt;
  // float dist = sqrt(dot(distanceVector,distanceVector))
  //this does the same as the previous commented code (i should've payed more attention to math)
  float mod = 1.5-distance(st, mt);

  float r = abs(sin(u_time));
  float g = abs(cos(u_time/2.0));
  float b = abs(tan(u_time/3.0));
  
  return vec4(r*mod, g*mod, b*mod, 1.0);
}

void main() {
  gl_FragColor = vec4(col());
}

