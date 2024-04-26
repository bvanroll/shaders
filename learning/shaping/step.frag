#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359


// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct) {
  return smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  // float y = pow(st.x, 2.0);
  // float y = pow(st.x, PI);
  // float y = sqrt(st.x);
  // float y = step(0.5, st.x);
  // float y = smoothstep(0.3,0.9,st.x);
  // this code creates a smooth gradient for a line edge from 0.4 to 0.5 and 0.5 to 0.6 since it's only checking the x coors
  float y = smoothstep(0.4,0.5,st.x) - smoothstep(0.5,0.6,st.x);
  vec3 color = vec3(y);

  float pct = plot(st,y);
  color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

  gl_FragColor = vec4(color, 1.0);
}
