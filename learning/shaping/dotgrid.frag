#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359


float circle_grid(in vec2 _st, in float _radius, in float amount, in float speed, in float xdir, in float ydir){
  vec2 dist = (_st*amount)+((u_time*speed)*vec2(xdir,ydir));
  dist = fract(dist);
  dist = dist-vec2(0.5);
  return 1.-smoothstep(_radius-(_radius*.01),_radius+(_radius*.01),
                       dot(dist,dist)*4.);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  vec2 stm = (u_mouse/u_resolution)-vec2(.5);
  color.r = circle_grid(st,(sin(u_time)+1.)/2., 8., 2.,stm.x, stm.y*-1.);
  color.g = circle_grid(st,(sin(u_time*2.)+1.)/4., 8., 2.,stm.x*-1., stm.y*-1.);
  color.b = circle_grid(st,(sin(u_time*3.)+1.)/8., 8., 2.,stm.x*-1., stm.y);
  //color.g = circle_grid(st,1.,2.*(sin(u_time)+1.), 2.,stm.x*-1., stm.y*-1.);
  //float b = circle_grid(st,1.,3.*(sin(u_time)+1.), 2.,stm.x*-1., stm.y*-1.);
  //color = vec3(r,g,b);
  gl_FragColor = vec4(color, circle_grid(st,1., 8., 2.,stm.x*-1., stm.y*-1.));

}
