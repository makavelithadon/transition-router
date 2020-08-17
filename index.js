//import routes from "./pages/index.js";
import * as utils from './utils'

let tl;

function animate() {
  return new Promise((resolve) => {
    tl = gsap.timeline();
    tl.from(".anim", {
      y: 20,
      opacity: 0,
      stagger: 0.25,
      ease: "power4.out",
      onComplete: resolve,
    });
  });
}

class Router {
  constructor({
    root = ".root",
    routes = [],
    transitions = [],
    preventRunning = false,
  } = {}) {
    this._root = document.querySelector(root);
    this._routes = routes;
    this._transitions = transitions;
    this._history = window.History;
    this._isAnimated = false;
    this._preventRunning = preventRunning;
    this.current = this._getPageFromURL();
    this.next = null;
    this.previous = null;
    this._init();
  }

  update (options) {
    for (const [props, value] of Object.entries(options)) {
      this[props] = value;
    }
  }

  _getPageFromURL () {
    const url = this._history.getState().cleanUrl;
    return url.slice(url.lastIndexOf('/'));
  }

  _init() {
    console.log("state on init", this._history.getState());
    // Bind to StateChange Event
    this._history.Adapter.bind(window, "statechange", () => {
      // Note: We are using statechange instead of popstate
      console.log("URL change", this._history.getState());
      this.update({ next: this._getPageFromURL() })
      this._onChange();
    });

    this._handleLinks();
    this.update({ next: this._getPageFromURL() })
    this._onChange(true);
  }

  debug () {
    console.log(['current', 'next', 'previous'].reduce((acc, props) => ({ ...acc, [props]: this[props] }), {}));
  }

  appendToDom (newDom) {
    this._root.insertAdjacentHTML(
        "afterbegin",
        newDom
      );
  }

  removeFromDom (domToRemove) {
    this._root.removeChild(domToRemove);
  }

  async _onChange(firstLoad) {
    this.debug()
    if (firstLoad) {
      this.appendToDom(this._routes.filter((route) => route.path === this.next)[0].content)

      if (utils.isFn(this._transitions[0].once)) {
        this._isAnimated = true;
        await this._transitions[0].once(this._root);
        this._isAnimated = false;
      }
      this._handleLinks(this._root);
      return;
    }
    if (!this._transitions.length) return;
    for (const transition of this._transitions) {
      if (utils.isFn(transition.leave)) {
        this._isAnimated = true;
        await transition.leave({previous: this.previous, current: this.current, next: this.next});
        this._isAnimated = false;
      }
      this.removeFromDom(this._root.firstElementChild);
      this.appendToDom(this._routes.filter((route) => route.path === this.next)[0].content)
      this._handleLinks(this._root);
      if (utils.isFn(transition.enter)) {
        this._isAnimated = true;
        await transition.enter(({previous: this.previous, current: this.current, next: this.next}));
        this._isAnimated = false;
      }
    }
  }

  _handleLinks(container = document) {
    const links = container.querySelectorAll('a[href]');
    if (!links.length) {
      console.log('No links to parse.');
      return;
    }
    const matchedLinks = this.routes
      .map((route) => container.querySelector(`a[href="${route.path}"]`))
      .filter(Boolean);

    if (!matchedLinks.length)
      throw new Error("No links match with provided routes paths");

    for (const link of matchedLinks) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const url = link.getAttribute("href");
        const pathname = document.location.pathname;
        if (pathname === url) return;
        if (this._preventRunning && this._isAnimated) return;
        this.update({next: url});
        this._history.pushState(
          { state: this._linkUrlToIdentifier(url) },
          link.getAttribute("data-history") || this._linkUrlToIdentifier(url),
          url
        );
      });
    }
  }

  _linkUrlToIdentifier(url) {
    return url.indexOf("/") === 0 ? url.slice(1) : url;
  }

  get routes() {
    return this._routes;
  }
}

const home = {
  path: "/",
  title: "Romuald Duconseil -- Front-End Developper -- Home",
  content: `
  <div>
    <h1 class="page-title anim">
      Home
    </h1>
    <p class="anim">
      Consequat consequat cillum Lorem mollit officia commodo. Id magna in
      veniam sint magna non. Dolore culpa do elit nulla aute mollit
      proident sunt ullamco. Sint cillum id dolore commodo amet mollit
      sint occaecat nulla do minim voluptate. Nostrud id anim officia sit
      exercitation. Consequat ipsum in et excepteur. Amet sit non esse et
      laborum fugiat labore id duis aliquip et ad nulla. Incididunt non
      anim dolore nulla deserunt sunt officia duis aliquip. Enim do enim
      ea quis minim nisi sit ipsum tempor incididunt et anim ullamco. Enim
      id sunt quis Lorem consequat commodo exercitation consectetur
      consectetur sunt. Cillum non enim ex sint magna mollit nisi officia
      ad amet ad laborum ex. Ut labore officia occaecat consequat esse
      eiusmod est enim proident deserunt labore eu. Voluptate qui velit
      aute non proident deserunt. Occaecat ea pariatur magna tempor amet.
      Excepteur veniam exercitation officia aliquip amet id irure eiusmod
      eu laborum cupidatat magna reprehenderit. Nulla amet qui tempor
      ullamco eu nisi ad nulla cupidatat exercitation quis dolor qui
      excepteur. Aliqua sit dolor velit ut dolor anim id amet commodo in
      ad nulla exercitation sit. Aliquip consectetur sint excepteur in
      nulla. Elit irure sint in aute incididunt aute velit incididunt
      nulla officia adipisicing eu proident. Fugiat non nulla minim cillum
      magna cillum proident exercitation incididunt cillum irure Lorem.
    </p>
    <a class="button anim" href="/about">About me</a>
  </div>
`,
};

const about = {
  path: "/about",
  title: "Romuald Duconseil -- Front-End Developper -- About",
  content: `
  <div>
    <h1 class="page-title anim">
      About
    </h1>
    <p class="anim">
      Consequat consequat cillum Lorem mollit officia commodo. Id magna in
      veniam sint magna non. Dolore culpa do elit nulla aute mollit
      proident sunt ullamco. Sint cillum id dolore commodo amet mollit
      sint occaecat nulla do minim voluptate. Nostrud id anim officia sit
      exercitation. Consequat ipsum in et excepteur. Amet sit non esse et
      laborum fugiat labore id duis aliquip et ad nulla. Incididunt non
      anim dolore nulla deserunt sunt officia duis aliquip. Enim do enim
      ea quis minim nisi sit ipsum tempor incididunt et anim ullamco.
    </p>
    <a class="button anim" href="/">Back to Home</a>
  </div>
`,
};

const router = new Router({
  preventRunning: true,
  root: ".container",
  routes: [home, about],
  transitions: [
    {
      once() {
        return animate();
      },
      leave (data) {
        console.log('Leave with those entries', data);
        return new Promise(res => {
          const tl = gsap.timeline();
          tl.to('.anim', {
            x: 40,
            opacity: 0,
            stagger: 0.25,
            ease: "power4.out",
            onComplete: res,
          })
        });
      },
      enter (data) {
        console.log('Enter with those entries', data);
        return animate();
      }
    },
  ],
  preventRunning: true,
});
