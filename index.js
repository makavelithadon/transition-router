//import routes from "./pages/index.js";

const isFn = (n) => n && typeof n === "function";

function delay(n = 1000) {
  return new Promise((r) => setTimeout(r, n));
}

function animateOnce() {
  return new Promise((resolve) => {
    const tl = gsap.timeline();
    tl.from(".anim", {
      y: 20,
      opacity: 0,
      stagger: 0.25,
      ease: "power3.out",
      onComplete: resolve,
    });
    const reverseButton = document.querySelector(".reverse");
    reverseButton.addEventListener("click", () => {
      tl.reverse();
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
    this._init();
  }

  _init() {
    console.log("state on init", this._history.getState());
    // Bind to StateChange Event
    this._history.Adapter.bind(window, "statechange", () => {
      // Note: We are using statechange instead of popstate
      console.log("state on URL change", this._history.getState());
    });

    this._handleLinks();
    this._onChange({
      previous: null,
      next: /* `/${this._history.getState().title}` */ "/about",
      firstLoad: true,
    });
  }

  async _onChange({ previous, next, firstLoad }) {
    console.log(
      this._routes.filter((route) => route.path === next),
      next
    );
    if (firstLoad) {
      this._root.insertAdjacentHTML(
        "afterbegin",
        this._routes.filter((route) => route.path === next)[0].content
      );

      if (isFn(this._transitions[0].once)) {
        this._isAnimated = true;
        await this._transitions[0].once(this._root);
        this._isAnimated = false;
      }
      return;
    }
    if (!this._transitions.length) return;
    for (const transition of this._transitions) {
      if (isFn(transition.leave)) {
        this._isAnimated = true;
        await transition.leave(this._root);
        this._isAnimated = false;
      }
      if (isFn(transition.enter)) {
        this._isAnimated = true;
        await transition.enter(this._root);
        this._isAnimated = false;
      }
    }
  }

  _handleLinks() {
    const links = this.routes
      .map((route) => document.querySelector(`a[href="${route.path}"]`))
      .filter(Boolean);

    if (!links.length)
      throw new Error("No links match with provided routes paths");

    for (const link of links) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const url = link.getAttribute("href");
        const pathname = document.location.pathname;
        if (pathname === url) return;
        this._history.pushState(
          { state: this._urlToIdentifier(url) },
          link.getAttribute("data-history") || this._urlToIdentifier(url),
          url
        );
      });
    }
  }

  _urlToIdentifier(url) {
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
    <h1 class="page-title" class>
      Home
    </h1>
    <p>
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
  </div>
`,
};

const about = {
  path: "/about",
  title: "Romuald Duconseil -- Front-End Developper -- About",
  content: `
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
    <button class="reverse anim">Reverse animation</button>
`,
};

const router = new Router({
  root: ".container",
  routes: [home, about],
  transitions: [
    {
      once() {
        return animateOnce();
      },
    },
  ],
  preventRunning: true,
});

console.log({ router });
