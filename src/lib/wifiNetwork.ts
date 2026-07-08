export interface WifiPeer {
  id: string
  name: string
  connected: boolean
}

let peers: WifiPeer[] = []

export const startWifiServer = async () => {
  peers = []
  return true
}

export const searchWifiPeers = async (): Promise<WifiPeer[]> => {
  return peers
}

export const connectToWifiPeer = async (peerId: string) => {
  return {
    success: true,
    peerId
  }
}

export const disconnectWifi = async () => {
  peers = []
}

export const sendWifiMessage = async (
  message: unknown
) => {
  console.log('wifi send:', message)
  return true
}

export const onWifiMessage = (
  callback: (message: unknown) => void
) => {
  return () => {
    callback(null)
  }
}

// ============================================================
// WIFI SCREEN COMPATIBILITY TYPES
// ============================================================

export interface WifiPlayer {
  id: string
  name: string
  connected: boolean
}

export type ConnectionStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error'


export interface DiscoveredRoom {
  id: string
  name: string
  host: string
  players: number
}


// ============================================================
// WIFI NETWORK SERVICE OBJECT
// ============================================================

export const wifiNetwork = {

  startServer: async () => {
    return startWifiServer()
  },

  discoverRooms: async (): Promise<DiscoveredRoom[]> => {
    const found = await searchWifiPeers()

    return found.map(peer => ({
      id: peer.id,
      name: peer.name,
      host: peer.name,
      players: 1
    }))
  },

  connect: async (roomId: string) => {
    return connectToWifiPeer(roomId)
  },

  disconnect: async () => {
    return disconnectWifi()
  },

  send: async (message: unknown) => {
    return sendWifiMessage(message)
  },

  onMessage: (callback: (message: unknown) => void) => {
    return onWifiMessage(callback)
  }
}
