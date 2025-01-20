import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  footer.classList.add('wrapper');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const classes = ['footer-logo', 'footer-links', 'footer-links', 'footer-contact-links', 'social-media', 'copyright'];
  classes.forEach((c, i) => {
    const section = footer.children[i];
    if (section) section.classList.add(`${c}`);
  });

  const footerLogo = footer.querySelector('.footer-logo');
  const footerLogoLink = footerLogo.querySelector('a');
  if (footerLogoLink) {
    footerLogoLink.className = 'footer-logo';
    footerLogoLink.setAttribute('title', 'Footer brand logo');
  }
  footerLogo.querySelector('img').setAttribute('alt', 'Footer Brand Logo');

  const copyrights = footer.querySelector('.copyright');
  block.append(copyrights);

  block.append(footer);
}
