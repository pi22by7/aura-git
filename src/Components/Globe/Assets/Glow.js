import * as THREE from "three";
export const glowGeometry = new THREE.SphereGeometry(2.5, 32, 32);

export const createGlowMaterial = (camera) => {
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      c: { type: "f", value: 0.1 },
      p: { type: "f", value: 1.4 },
      glowColor: { type: "c", value: new THREE.Color(0x808080) },
      viewVector: { type: "v3", value: camera.position },
    },
    vertexShader: `
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            vNormal = normalize( normalMatrix * normal );
            vViewPosition = -normalize( modelViewMatrix * vec4( position, 1.0 ) ).xyz;
          }
        `,
    fragmentShader: `
          uniform vec3 glowColor;
          uniform float c;
          uniform float p;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            float intensity = pow( c - dot(vNormal, vViewPosition), p );
            gl_FragColor = vec4( glowColor, intensity );
          }
        `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });
  return glowMaterial;
};
