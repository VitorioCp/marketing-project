import axios from 'axios';

export const Api = axios.create({
  baseURL: 'https://agentezap-backend.gtrphk.easypanel.host',
})