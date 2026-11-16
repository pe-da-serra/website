import { useHead } from '@unhead/vue';
import { address, email, phone } from './contact';
import defaultImage from '@/assets/hotel-1-lg.jpg';

export const siteUrl = 'https://pedaserrahotel.com.br';
export const siteName = 'Pé da Serra Hotel';

export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;

type PageSeo = {
  title: string,
  description: string,
  // Canonical path of the page, e.g. '/quartos/casal'
  path: string,
  image?: string,
};

export function usePageSeo({ title, description, path, image = defaultImage }: PageSeo) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  useHead({
    title,
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: 'pt_BR' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: imageUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  });
}

// Pages that only make sense inside a booking flow must not show up in search results.
export function useNoIndex() {
  useHead({
    meta: [{ name: 'robots', content: 'noindex' }],
  });
}

// https://developers.google.com/search/docs/appearance/structured-data/local-business
export function useHotelStructuredData() {
  const amenities = [
    'Wi-Fi de alta velocidade',
    'Café da manhã incluso',
    'Ar-condicionado',
    'TV smart com canais liberados',
    'Recepção 24 horas',
    'Monitoramento por câmeras',
    'Localização central',
  ];

  useHead({
    script: [{
      type: 'application/ld+json',
      key: 'hotel-structured-data',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Hotel',
        '@id': `${siteUrl}/#hotel`,
        name: siteName,
        url: absoluteUrl('/'),
        image: absoluteUrl(defaultImage),
        logo: absoluteUrl('/favicon.svg'),
        description: 'Hotel no centro de Resende (RJ), a menos de 500 m da AMAN. Ponto de partida para Penedo, Itatiaia e a Serra da Mantiqueira.',
        telephone: `+55 ${phone}`,
        email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: address[0],
          addressLocality: 'Resende',
          addressRegion: 'RJ',
          postalCode: address[2],
          addressCountry: 'BR',
        },
        amenityFeature: amenities.map(name => ({
          '@type': 'LocationFeatureSpecification',
          name,
          value: true,
        })),
        potentialAction: {
          '@type': 'ReserveAction',
          target: absoluteUrl('/reserva'),
        },
      }),
    }],
  });
}
