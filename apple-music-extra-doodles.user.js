// ==UserScript==
// @name         Apple Music extra doodles
// @namespace    https://tampermonkey.net/
// @version      2026.10.07
// @description  Helper functions for Apple Music (PWA). Also adds Liquid Glass
// @author       You
// @match        https://music.apple.com/*
// @match        https://beta.music.apple.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @homepageURL  https://github.com/heladeradr/apple-music-extra-doodles
// @updateURL    https://raw.githubusercontent.com/heladeradr/apple-music-extra-doodles/main/apple-music-extra-doodles.user.js
// @downloadURL  https://raw.githubusercontent.com/heladeradr/apple-music-extra-doodles/main/apple-music-extra-doodles.user.js
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    const SVG_NS   = 'http://www.w3.org/2000/svg';
    const XLINK_NS = 'http://www.w3.org/1999/xlink';
    const SCALE    = 115;

    const leftSegmentMap   = 'data:image/png;base64,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';
    const rightSegmentMap  = 'data:image/png;base64,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';
    const centerSegmentMap = 'data:image/png;base64,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';

    const SEGMENT_MAPS = [
        { id: 'left-segment',   href: leftSegmentMap,   preserveAspectRatio: null   },
        { id: 'right-segment',  href: rightSegmentMap,  preserveAspectRatio: null   },
        { id: 'center-segment', href: centerSegmentMap, preserveAspectRatio: 'none' },
    ];

    const PLAYER_SELECTOR = [
      '.player-bar__floating-player > .wrapper > .chrome-player[data-testid="chrome-player"]',
      '.cloud-buttons--with-platter',
      '.search-input-wrapper',
      '.content-scope-bar__controls.typography-segmented-control:has(.search-scope-bar__pill-container)'
    ].join(', ');
    const INJECTED_KEY    = 'hdGlassInjected';

    // ── SVG filter injection ───────────────────────────────────────────────────

    function injectSVGFilters() {
        if (document.getElementById('hd-segment-filters')) return;

        const container = document.createElement('div');
        container.id = 'hd-segment-filters';
        container.style.cssText = 'display:none;position:absolute;width:0;height:0;overflow:hidden;';

        for (const { id, href, preserveAspectRatio } of SEGMENT_MAPS) {
            const svg    = document.createElementNS(SVG_NS, 'svg');
            svg.style.display = 'none';

            const defs   = document.createElementNS(SVG_NS, 'defs');
            const filter = document.createElementNS(SVG_NS, 'filter');
            filter.setAttribute('id',     id);
            filter.setAttribute('x',      '0');
            filter.setAttribute('y',      '0');
            filter.setAttribute('width',  '100%');
            filter.setAttribute('height', '100%');

            const feImage = document.createElementNS(SVG_NS, 'feImage');
            feImage.setAttributeNS(XLINK_NS, 'xlink:href', href);
            feImage.setAttribute('href',   href);
            feImage.setAttribute('result', 'dispMap');
            if (preserveAspectRatio !== null)
                feImage.setAttribute('preserveAspectRatio', preserveAspectRatio);

            const feDisp = document.createElementNS(SVG_NS, 'feDisplacementMap');
            feDisp.setAttribute('in',               'SourceGraphic');
            feDisp.setAttribute('in2',              'dispMap');
            feDisp.setAttribute('scale',            String(SCALE));
            feDisp.setAttribute('xChannelSelector', 'R');
            feDisp.setAttribute('yChannelSelector', 'G');

            filter.append(feImage, feDisp);
            defs.append(filter);
            svg.append(defs);
            container.append(svg);
        }

        document.documentElement.prepend(container);
    }

    // ── Glass distort injection ────────────────────────────────────────────────

    function injectGlassDistort(player) {
        if (player.dataset[INJECTED_KEY]) return;
        player.dataset[INJECTED_KEY] = '1';

        const wrapper = document.createElement('div');
        wrapper.className = 'glass-distort';

        for (const cls of ['left-distort', 'center-distort', 'right-distort']) {
            const div = document.createElement('div');
            div.className = cls;
            wrapper.append(div);
        }

        player.append(wrapper);
    }

    function scanAndInject() {
        document.querySelectorAll(PLAYER_SELECTOR).forEach(injectGlassDistort);
    }

    // ── Title nuking ──────────────────────────────────────────────────────────

    const clearTitle = () => {
        if (document.title !== '') document.title = '';
    };

    // ── MutationObserver ──────────────────────────────────────────────────────

    new MutationObserver(() => {
        clearTitle();
        scanAndInject();
    }).observe(document.documentElement, { childList: true, subtree: true });

    // ── Bootstrap ─────────────────────────────────────────────────────────────

    function init() {
        injectSVGFilters();
        clearTitle();
        scanAndInject();
    }

    init();
    document.addEventListener('DOMContentLoaded', init);
    window.addEventListener('load', init);

})();