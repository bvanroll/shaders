#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

vec2 rotate2D (vec2 st, float angle) {
  st -= .5;
  st = mat2(cos(angle),-sin(angle),
            sin(angle),cos(angle))*st;
  st += .5;
  return st;

}

vec2 tile (vec2 st, float zoom) {
  st *= zoom;
  return fract(st);
}

vec2 rotateTilePatter(vec2 st) {
  st *= 2.;
  float index = 0.0;
  index += step(1., mod(st.x,2.));
  index += step(1.,mod(st.y,2.))*2.;
  st = fract(st);

  if(index == 1.) {
    st = rotate2D(st, PI*.5);
  } else if (index == 2.){
    st = rotate2D(st, PI*-.5);
  } else if (index == 3.){
    st = rotate2D(st, PI);
  }

  return st;
}


void main() {
  vec2 st = (gl_FragCoord.xy*2. - u_resolution.xy)/u_resolution.y;
//  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  st = fract(st*2.);
  st = rotateTilePatter(st);
  
  color += step(st.x,st.y);



  

  gl_FragColor = vec4(color, alpha);
}
