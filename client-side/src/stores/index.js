import { proxy } from 'valtio'

const valtio = proxy({
    intro: true,
    color: '#171717',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
});

export default valtio;