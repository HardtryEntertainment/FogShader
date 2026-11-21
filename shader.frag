precision highp float;

varying vec2 vTexCoord;
varying float vFogDepth;

// Texture
uniform sampler2D u_texture;

// Color
uniform vec4 u_fogColor;

// Fog Amount
uniform float u_fogNear;
uniform float u_fogFar;

void main() {
    vec4 color = texture2D(u_texture, vTexCoord).bgra;

    float fogAmount = smoothstep(u_fogNear, u_fogFar, vFogDepth);

    gl_FragColor = mix(color, u_fogColor, fogAmount);  
}