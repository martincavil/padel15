// Sections Prismic du site : une entrée par slice (voir src/slices/*/model.json).
import B2bHighlight from "./B2bHighlight";
import CourseBooking from "./CourseBooking";
import CtaBanner from "./CtaBanner";
import FeatureGrid from "./FeatureGrid";
import Gallery from "./Gallery";
import InstagramVideos from "./InstagramVideos";
import Logos from "./Logos";
import OfferCards from "./OfferCards";
import Pricing from "./Pricing";
import RichText from "./RichText";
import TextImage from "./TextImage";
import Widget from "./Widget";

export const components = {
  b2b_highlight: B2bHighlight,
  course_booking: CourseBooking,
  cta_banner: CtaBanner,
  feature_grid: FeatureGrid,
  gallery: Gallery,
  instagram_videos: InstagramVideos,
  logos: Logos,
  offer_cards: OfferCards,
  pricing: Pricing,
  rich_text: RichText,
  text_image: TextImage,
  widget: Widget,
};
