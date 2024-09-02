import { Mask } from "maska"

export const phoneMask = new Mask({
  mask: [ '(##) #####-####', '(##) ####-####' ],
});

export const documentMask = new Mask({ mask: '###.###.###-##' });
