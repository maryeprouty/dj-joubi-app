import axios from './axios.helper.js';

export async function getPlaylists() {
    try {
        const result = await axios.get('/api/playlists', { withCredentials: true });
        let playlists = result.data?.playlists?.items;
        playlists = playlists?.filter(playlist => playlist?.name?.toLowerCase().includes('wedding')) ?? [];
        return playlists;
    } catch (error) {
        console.error('Error fetching playlists:', error);
        throw error;
    }
}

export async function getTracks(playlist) {
    try {
        const result = await axios.get(`/api/tracks?playlist=${playlist}`, { withCredentials: true });
        return result.data.tracks;
    } catch (error) {
        console.error(`Error fetching tracks for playlist ${playlist}`, error);
        throw error;
    }
}

export async function playSelectedPlaylist(trackIds, device_id) {
    try {
        
        const trackUris = trackIds.map(id => `spotify:track:${id}`);

        const data = {
            "uris": trackUris
        }

        await axios.put(`/api/play?device_id=${device_id}`, data, { withCredentials: true });

    } catch (error) {
        console.error('Error playing this playlist: ', error);
        throw error;
    }
}

export async function resumePlayback(device_id) {
    try {
        await axios.put(`/api/play?device_id=${device_id}`, null, { withCredentials: true });
    } catch (error) {
        console.error('Error resuming playback: ', error);
        throw error;
    }
}

export async function pausePlayback(device_id) {
    try {
        await axios.put(`/api/pause?device_id=${device_id}`, null, { withCredentials: true });
    } catch (error) {
        console.error('Error pausing the playback: ', error);
        throw error;
    }
}
