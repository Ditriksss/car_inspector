import axios from 'axios';

export async function get(url: string) {
    const response = await axios.get(url);
    return response.data;
}