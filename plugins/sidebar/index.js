import pluginInfo from '../../plugin-manifest.json';
import {
  addElementToCache,
  getCachedElement,
} from '../../common/plugin-element-cache.js';
import i18n from '../../i18n';

export const createSidebar = (id) => {
  const containerCacheKey = `${pluginInfo.id}-${id || ''}-surferseo-content-analyzer-container`;
  let contentAnalyzerContainer = getCachedElement(containerCacheKey)?.element;
  if (!contentAnalyzerContainer) {
    contentAnalyzerContainer = document.createElement('div');
    contentAnalyzerContainer.classList.add(
      'flotiq-ui-plugin-surfer-seo-content-analyzer-container',
    );

    contentAnalyzerContainer.innerHTML = `
        <div id="flotiq-ui-plugin-surfer-seo-content-analyzer-label" class="content-analyzer-label--hidden" >
            <img class="flotiq-ui-plugin-surfer-seo-content-analyzer-warning"/>
            ${i18n.t('ThirdPartyCookies')}
        </div>
        <div id="flotiq-ui-plugin-surfer-seo-sidebar-element"> </div>
    `;

    const onNavigationCallback = (RpcView) => {
      if (['draft_loading', 'draft_creation', 'guidelines'].includes(RpcView)) {
        contentAnalyzerContainer
          .querySelector('#flotiq-ui-plugin-surfer-seo-content-analyzer-label')
          .classList.add(
            'flotiq-ui-plugin-surfer-seo-content-analyzer-label--hidden',
          );

        contentAnalyzerContainer
          .querySelector('#flotiq-ui-plugin-surfer-seo-sidebar-element-iframe')
          .classList.remove(
            'flotiq-ui-plugin-surfer-seo-sidebar-element-iframe--short',
          );
      } else {
        contentAnalyzerContainer
          .querySelector('#flotiq-ui-plugin-surfer-seo-content-analyzer-label')
          .classList.remove(
            'flotiq-ui-plugin-surfer-seo-content-analyzer-label--hidden',
          );

        contentAnalyzerContainer
          .querySelector('#flotiq-ui-plugin-surfer-seo-sidebar-element-iframe')
          .classList.add(
            'flotiq-ui-plugin-surfer-seo-sidebar-element-iframe--short',
          );
      }
    };

    const { $iframe, setPermalink, setHtml } =
      window.surferGuidelines.initWithOptions({
        onNavigation: onNavigationCallback,
      });

    window.surferGuidelines.setHtml = setHtml;

    setPermalink(id);

    $iframe.id = 'flotiq-ui-plugin-surfer-seo-sidebar-element-iframe';
    $iframe.classList.add(
      'flotiq-ui-plugin-surfer-seo-sidebar-element-iframe--short',
    );

    contentAnalyzerContainer
      .querySelector(`#flotiq-ui-plugin-surfer-seo-sidebar-element`)
      .appendChild($iframe);

    addElementToCache(contentAnalyzerContainer, containerCacheKey);
  }

  return contentAnalyzerContainer;
};
