import * as THREE from "three";
import art_map from "../map.png";
import night_sky from "../night-sky.png";
// Add stars
const starsGeometry = new THREE.SphereGeometry(100, 32, 32);
const starsMaterial = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load(night_sky),
  side: THREE.DoubleSide,
});
export const stars = new THREE.Mesh(starsGeometry, starsMaterial);

export const createSphere = (radius) => {
  const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(art_map),
    side: THREE.DoubleSide,
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  return sphere;
};
