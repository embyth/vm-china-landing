import Navigation from "./navigation.js";
import Hero from "./hero.js";
import Testimonials from "./testimonials.js";
import PhotoViewer from "./photo-viewer.js";
import Partners from "./partners.js";
import Products from "./products.js";
import Calculate from "./calculate.js";
import Contact from "./contact.js";
import GoogleMap from "./map.js";

import {setFooterYear} from "./helpers.js";

const navigation = new Navigation();
const hero = new Hero();
const testimonials = new Testimonials();
const photoViewer = new PhotoViewer();
const partners = new Partners();
const products = new Products();
const calculate = new Calculate();
const contact = new Contact();
const map = new GoogleMap();

navigation.init();
hero.init();
testimonials.init();
photoViewer.init();
partners.init();
products.init();
calculate.init();
contact.init();
map.init();

setFooterYear();
