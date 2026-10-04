import apricotDelightImg from './apricot_delight_dessert_1791130974213.jpg';
import brandLogoImg from './brand_logo_df13_1791132080251.jpg';
import coolCakeImg from './cool_cake_celebration_1791132683933.jpg';
import deathByChocolateImg from './death_by_chocolate_1791132720153.jpg';
import dessertCafeAmbienceImg from './dessert_cafe_ambience_1791131003996.jpg';
import dubaiPistachioImg from './dubai_pistachio_chocolate_1791130956868.jpg';
import heroImg from './hero_dessert_factory_1791130942756.jpg';
import lotusBiscoffImg from './lotus_biscoff_cheesecake_1791130986909.jpg';
import pistachioMilkCakeImg from './pistachio_milk_cake_1791132704325.jpg';

export const IMAGES = {
  coolCake: coolCakeImg,
  pistachioMilkCake: pistachioMilkCakeImg,
  deathByChocolate: deathByChocolateImg,
  apricotDelight: apricotDelightImg,
  lotusBiscoff: lotusBiscoffImg,
  hero: heroImg,
  cafeAmbience: dessertCafeAmbienceImg,
  dubaiPistachio: dubaiPistachioImg,
  brandLogo: brandLogoImg,
};

/**
 * Resolves an image path to a production-safe bundled asset URL.
 * Automatically handles and converts legacy '/src/assets/images/...' paths
 * stored in localStorage or mock data so they never 404 on Vercel.
 */
export function resolveImagePath(path?: string): string {
  if (!path) return IMAGES.hero;

  // Map legacy /src/... or filenames to the bundled Vite asset
  if (path.includes('cool_cake_celebration')) return IMAGES.coolCake;
  if (path.includes('pistachio_milk_cake')) return IMAGES.pistachioMilkCake;
  if (path.includes('death_by_chocolate')) return IMAGES.deathByChocolate;
  if (path.includes('apricot_delight')) return IMAGES.apricotDelight;
  if (path.includes('lotus_biscoff')) return IMAGES.lotusBiscoff;
  if (path.includes('dessert_cafe_ambience')) return IMAGES.cafeAmbience;
  if (path.includes('dubai_pistachio')) return IMAGES.dubaiPistachio;
  if (path.includes('brand_logo_df13')) return IMAGES.brandLogo;
  if (path.includes('hero_dessert_factory')) return IMAGES.hero;

  // External URLs (e.g. uploaded by admin)
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // If path starts with /src/assets/images/, convert to public /images/
  if (path.startsWith('/src/assets/images/')) {
    return path.replace('/src/assets/images/', '/images/');
  }

  return path;
}
