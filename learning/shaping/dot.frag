#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359


// original test used 4. for test. It's also responsible for changing the radius, it seems anything under 1 is larger than the screen when using a radius of .9
float circle(in vec2 _st, in float _radius, in float test){
  vec2 dist = _st-vec2(0.5);
  return 1.-smoothstep(_radius-(_radius*.01),_radius+(_radius*.01),
                       dot(dist,dist)*test);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  color = vec3(circle(st,0.001, 4.0));
  gl_FragColor = vec4(color, 1.0);

}
