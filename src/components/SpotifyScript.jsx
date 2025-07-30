import { createElement } from 'react';

const SpotifyScript = () => {
  const script = createElement('script', {
    id: 'spotify-player',
    type: 'text/javascript',
    async: true,
    defer: false,
    src: 'https://sdk.scdn.co/spotify-player.js',
    onLoad: () => {
      console.log('Spotify loaded');
    },
    onError: console.error
  });

  return script;
};

export default SpotifyScript;