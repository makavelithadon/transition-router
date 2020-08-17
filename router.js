import * as utils from "./utils";

function getDefaultHooks() {
  return {
    once: () => {},
    afterOnce: () => {},
    enter: () => {},
    leave: () => {},
    afterLeaver: () => {},
    afterEnter: () => {},
  };
}

export default class Router {
  constructor({
    root = ".root",
    routes = [],
    transitions = [],
    preventRunning = false,
    hooks = getDefaultHooks(),
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
    this.hooks = hooks;
    this.currentAnimation = null;
    this.pipe = [];
    this._init();
  }

  setState(options) {
    for (const [props, value] of Object.entries(options)) {
      this[props] = value;
    }
  }

  _getPageFromURL() {
    const url = this._history.getState().cleanUrl;
    return url.slice(url.lastIndexOf("/"));
  }

  _init() {
    // Bind to StateChange Event
    this._history.Adapter.bind(window, "statechange", () => {
      this._onChange();
    });

    this._handleLinks();
    this.setState({ next: this.current });
    this._onChange(true);
  }

  debug() {
    console.log(this.getState());
  }

  appendToDom(newDom) {
    this._root.insertAdjacentHTML("afterbegin", newDom);
  }

  removeFromDom(domToRemove) {
    if (domToRemove === null) return;
    this._root.removeChild(domToRemove);
  }

  getState() {
    return ["previous", "current", "next", "_root"].reduce(
      (acc, props) => ({ ...acc, [props]: this[props] }),
      {}
    );
  }

  changeRoute({ content, title, scripts }, nextState = {}) {
    this.appendToDom(content);
    if (title) document.title = title;
    if (scripts && !!scripts.length) {
      for (const script of scripts) {
        script();
      }
    }
    this._handleLinks(this._root);
  }

  async _onChange(firstLoad) {
    const pageUrl = this._getPageFromURL();

    this.setState({ next: pageUrl });

    const transition = this.getMatchingTransition(firstLoad);
    const nextRoute = this._routes.find((route) => route.path === pageUrl);
    console.log({ transition });
    if (firstLoad) {
      this.changeRoute(nextRoute);
      this.setState({ next: null });
      const state = this.getState();
      this._isAnimated = true;
      this.hooks.enter(state);
      if (transition) {
        if (transition.once) {
          await transition.once(state);
          this.hooks.afterOnce(state);
        }
        transition.enter && (await transition.enter(state));
      }
      this._isAnimated = false;
      this.hooks.afterEnter(state);
      return;
    }

    // Start normal workflow (leave then enter transitions) if any

    // Leave transition
    let state = this.getState();
    this.hooks.leave(state);
    this._isAnimated = true;
    if (transition) {
      transition.leave && (await transition.leave(state));
    }
    this._isAnimated = false;
    this.removeFromDom(this._root.firstElementChild);
    this.hooks.afterLeave(state);
    this.setState({ previous: this.current, current: pageUrl, next: null });
    state = this.getState();
    this.changeRoute(nextRoute);
    this.hooks.enter(state);
    this._isAnimated = true;
    if (transition) {
      transition.enter && (await transition.enter(state));
      this.hooks.afterEnter(state);
    }
    this._isAnimated = false;
  }

  getMatchingTransition(firstLoad) {
    const { current, next } = this.getState();
    let found = this._transitions.find(({ from, to }) => {
      if (from && to) {
        return from.route === current && to.route === next;
      }
      if (to) {
        return to.route === next;
      }
      if (from) {
        return from.route === current;
      }
    });
    if (!found) {
      found = this._transitions.find(({ leave, enter, once }) => {
        return (
          utils.isFn(leave) ||
          utils.isFn(enter) ||
          (firstLoad && utils.isFn(once))
        );
      });
    }
    return found;
  }

  _handleLinks(container = document) {
    const links = container.querySelectorAll("a[href]");
    if (!links.length) {
      console.log("No links to parse.");
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
