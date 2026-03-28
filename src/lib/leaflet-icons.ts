import L from 'leaflet';

type IconDefaultPrototype = typeof L.Icon.Default.prototype & {
  _getIconUrl?: () => string;
};

delete (L.Icon.Default.prototype as IconDefaultPrototype)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
