#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  // simple enough, basically adding together both coors and dividing by 2 (aka multing by .5)
  color += step(.5,(st.x+st.y)*.5);


  

  gl_FragColor = vec4(color, alpha);
}
