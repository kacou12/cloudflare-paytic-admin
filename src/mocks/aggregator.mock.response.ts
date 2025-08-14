import type { ConfigurationAgrégateurs } from '@/services/switch-aggregators/swith-aggregator.type'

export const mockAggregator: ConfigurationAgrégateurs = {
  agrégateurs: [
    { nom: 'Orange', logo: '/logos/orange.png' },
    { nom: 'Moov', logo: '/logos/moov.png' },
    { nom: 'MTN', logo: '/logos/mtn.png' },
    { nom: 'Wave', logo: '/logos/wave.png' },
  ],
  réseaux: {
    orange: {
      id: 'orange',
      nom: 'Orange',
      logo: '/logos/orange.png',
      actif: true,
      hubs: [
        { id: 'HUB2', name: 'HUB2' },
        { id: 'Bizao', name: 'Bizao' },
        { id: 'inTouch', name: 'inTouch' },
      ],
    },
    moov: {
      id: 'moov',
      nom: 'Moov',
      logo: '/logos/moov.png',
      actif: true,

      hubs: [
        { id: 'HUB2', name: 'HUB2' },

        { id: 'inTouch', name: 'inTouch' },
      ],
    },
    mtn: {
      id: 'mtn',
      nom: 'MTN',
      logo: '/logos/mtn.png',
      actif: true,

      hubs: [
        { id: 'HUB2', name: 'HUB2' },

        { id: 'inTouch', name: 'inTouch' },
      ],
    },
    wave: {
      id: 'wave',
      nom: 'Wave',
      logo: '/logos/wave.png',
      actif: true,

      hubs: [
        { id: 'HUB2', name: 'HUB2' },
        { id: 'Bizao', name: 'Bizao' },
        { id: 'inTouch', name: 'inTouch' },
      ],
    },
  },
  configurationParRéseau: {
    orange: {
      prélèvement: {
        hub: 'HUB2',
        commission: { pourcentage: 3, surLaTransaction: true },
      },
      dépôt: {
        hub: 'HUB2',
        commission: { pourcentage: 3, surLaTransaction: true },
      },
    },
    // Configurations similaires pour les autres réseaux
    moov: {
      prélèvement: {
        hub: 'HUB2',
        commission: { pourcentage: 3, surLaTransaction: true },
      },
      dépôt: {
        hub: 'HUB2',
        commission: { pourcentage: 3, surLaTransaction: true },
      },
    },
    mtn: {
      prélèvement: {
        hub: 'HUB2',
        commission: { pourcentage: 3, surLaTransaction: true },
      },
      dépôt: {
        hub: 'HUB2',
        commission: { pourcentage: 3, surLaTransaction: true },
      },
    },
    wave: {
      prélèvement: {
        hub: 'HUB2',
        commission: { pourcentage: 3, surLaTransaction: true },
      },
      dépôt: {
        hub: 'HUB2',
        commission: { pourcentage: 3, surLaTransaction: true },
      },
    },
  },
  collectes: {
    orange: false,
    moov: false,
    mtn: false,
    wave: false,
  },
  transfertDArgent: {
    orange: false,
    moov: false,
    mtn: false,
    wave: false,
  },
}
