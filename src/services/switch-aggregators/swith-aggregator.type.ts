// Types d'hub disponibles
type TypeHub = 'HUB2' | 'Bizao' | 'inTouch'

export interface Hub {
  id: string
  name: TypeHub
}

// Types principaux
export interface Agrégateur {
  nom: string
  logo: string // URL ou chemin vers l'image du logo
}

export interface Réseau {
  id: string // 'orange', 'moov', 'mtn', 'wave'
  nom: string
  logo: string
  actif: boolean
  hubs: Hub[]
}

// Structure pour les prélèvements et dépôts
export interface Commission {
  pourcentage: number // 3% dans les exemples
  surLaTransaction: boolean
}

export interface ConfigurationHub {
  prélèvement: {
    hub: TypeHub // 'HUB2', 'Bizao', ou 'inTouch'
    commission: Commission
  }
  dépôt: {
    hub: TypeHub // 'HUB2', 'Bizao', ou 'inTouch'
    commission: Commission
  }
}

// Configuration globale
export interface ConfigurationAgrégateurs {
  agrégateurs: Agrégateur[]
  réseaux: {
    [key: string]: Réseau // clé: 'orange', 'moov', 'mtn', 'wave'
  }
  configurationParRéseau: {
    [key: string]: ConfigurationHub // clé: 'orange', 'moov', 'mtn', 'wave'
  }
  collectes: {
    [key: string]: boolean // clé: 'orange', 'moov', 'mtn', 'wave', valeur: actif/inactif
  }
  transfertDArgent: {
    [key: string]: boolean // clé: 'orange', 'moov', 'mtn', 'wave', valeur: actif/inactif
  }
}

// export interface  pour l'état global de la page
export interface ÉtatPageAgrégateurs {
  réseauSélectionné: string | null // 'Moov', 'Orange', 'MTN', 'Wave'
  configurationActuelle: ConfigurationAgrégateurs
  modeÉdition: boolean
}

// export interface  pour les actions de mise à jour
export interface MiseÀJourParamètresRequest {
  collectes: {
    [key: string]: boolean
  }
  transfertDArgent: {
    [key: string]: boolean
  }
  commissions?: {
    prélèvement: Commission
    dépôt: Commission
  }
  hubs?: {
    prélèvement: TypeHub
    dépôt: TypeHub
  }
}
