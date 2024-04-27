#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  // vec3 color = vec3(0.0,0.0,0.0);
  // find a way to make this a circle even when non 1:1 aspect ratio
  // i found something, although i cannot say with full competence it works 100%
  //float variable = sqrt((u_resolution.x * u_resolution.x) + (u_resolution.y * u_resolution.y));
  //float variable = (u_resolution.x + u_resolution.y)/((sin(u_time) + 1.0) / 2.0);
  float variable = ((u_resolution.x + u_resolution.y)*5.0)/7.0;
  float pct = distance(gl_FragCoord.xy, (vec2(0.5)*u_resolution)) /  variable;
  vec3 color = vec3(1.0-step(0.1,pct));
  //vec3 color = vec3(pct);
  float test = 1.0;
  gl_FragColor = vec4(color, test);
}
