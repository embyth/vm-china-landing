import {paths} from '../paths.js';
import pkg from 'gulp';

const {vendor, source, destination} = paths;
const {src, dest} = pkg;

export const copy = (done) => {
  src(vendor.styles)
    .pipe(dest(`${destination.styles}libs/`));
  src(`${source.images.all}**/*.ico`)
    .pipe(dest(destination.images.all));
  src(`${source.images.all}**/*.gif`)
    .pipe(dest(destination.images.all));

  done();
}
