import history from "history/browser";
import { v4 as uuidv4 } from "uuid";
import { areEqual, isFn } from "@js/utils";

function getDefaultHooks() {
  return {
    once: () => {},
    afterOnce: () => {},
    beforeLeave: () => {},
    leave: () => {},
    afterLeave: () => {},
    beforeEnter: () => {},
    enter: () => {},
    afterEnter: () => {},
  };
}

export default class Router {
  constructor({
    root = ".root",
    routes = [],
    transitions = [],
    preventRunning = false,
    hooks = {},
    debug = false,
  } = {}) {
    this._root = document.querySelector(root);
    this._routes = routes;
    this._transitions = transitions;
    this._history = history;
    this._isAnimated = false;
    this._preventRunning = preventRunning;
    this.current = this._getPageFromURL();
    this.next = null;
    this.previous = null;
    this.hooks = { ...getDefaultHooks(), ...hooks };
    this.animationId = null;
    this.debug = debug;
    this._init();
  }

  setState(options) {
    for (const [props, value] of Object.entries(options)) {
      this[props] = value;
    }
    return this.getState();
  }

  _getPageFromURL() {
    const url = this._history.location.pathname;
    return url.slice(url.lastIndexOf("/"));
  }

  _init() {
    this._history.listen(() => this._onChange());
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
    return ["previous", "current", "next", "_root", "animationId"].reduce(
      (acc, props) => ({ ...acc, [props]: this[props] }),
      {}
    );
  }

  changeRoute({ content, title, scripts }) {
    this.appendToDom(content);
    if (title) document.title = title;
    if (scripts && !!scripts.length) {
      for (const script of scripts) {
        script();
      }
    }
    this._handleLinks(this._root);
  }

  async leave(transition, state, id) {
    this.handleShouldAnimationContinue(id, state);
    if (this._root.innerHTML.length === 0) return;
    this.hooks.beforeLeave(state);
    this.hooks.leave(state);
    this._isAnimated = true;
    this.removeClickOnRouterLinks();
    if (transition) {
      transition.leave && (await transition.leave(state));
    }
    this._isAnimated = false;
    this.handleShouldAnimationContinue(id, state);
    this.removeFromDom(this._root.firstElementChild);
    this.hooks.afterLeave(state);
  }

  async enter(route, transition, state, id) {
    this.handleShouldAnimationContinue(id, state);
    this.changeRoute(route);
    this.hooks.beforeEnter(state);
    this.hooks.enter(state);
    this._isAnimated = true;
    if (transition) {
      transition.enter && (await transition.enter(state));
    }
    this.hooks.afterEnter(state);
    this._isAnimated = false;
  }

  async once(route, transition, state, id) {
    this.handleShouldAnimationContinue(id, state);
    this._isAnimated = true;
    this.hooks.once(state);
    if (transition) {
      transition.once && (await transition.once(transition, state));
    }
    this._isAnimated = false;
    this.hooks.afterOnce(state);
    this.enter(route, transition, state, id);
  }

  handleShouldAnimationContinue(animationId, { current, next }) {
    if (!areEqual(this.animationId, animationId)) {
      throw new Error(
        `Cancel animation ${animationId} from ${current} to ${next}`
      );
    }
  }

  async _onChange(firstLoad) {
    try {
      const id = (this.animationId = uuidv4());
      const pageUrl = this._getPageFromURL();
      let state = this.setState({ next: pageUrl });
      const transition = this.getMatchingTransition(firstLoad);
      const nextRoute = this._routes.find((route) => route.path === pageUrl);

      if (!firstLoad) {
        // Leave workflow
        await this.leave(transition, state, id);
      }

      state = this.setState({
        next: null,
        ...(!firstLoad && { previous: this.current, current: pageUrl }),
      });

      const next = !firstLoad ? this.enter : this.once;

      // Enter/Once workflow
      await next.call(this, nextRoute, transition, state, id);
    } catch (error) {
      this.debug && console.info("Error", error);
    }
  }

  getMatchingTransition(firstLoad) {
    const { current, next } = this.getState();
    let foundTransition = this._transitions.find(({ from, to }) => {
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
    if (!foundTransition) {
      foundTransition = this._transitions.find(({ leave, enter, once }) => {
        return isFn(leave) || isFn(enter) || (firstLoad && isFn(once));
      });
    }
    return foundTransition;
  }

  removeClickOnRouterLinks() {
    for (const link of [...this._root.querySelectorAll("a[href")]) {
      link.removeEventListener(
        "click",
        this.handleClickOnRouterLinks.bind(this)
      );
    }
  }

  handleClickOnRouterLinks(e) {
    e.preventDefault();
    e.stopPropagation();
    const url = e.target.getAttribute("href");
    const pathname = document.location.pathname;
    if (pathname === url || (this._preventRunning && this._isAnimated)) return;
    this._history.push(url);
  }

  _handleLinks(container = document) {
    const links = container.querySelectorAll("a[href]");
    // If on first parsing we have no links so no router reason to exist
    if (!links.length && container === document) {
      console.log("No links to parse.");
      return;
    }
    const matchedLinks = this.routes
      .map((route) => container.querySelector(`a[href="${route.path}"]`))
      .filter(Boolean);

    if (!matchedLinks.length)
      throw new Error("No links match with provided routes paths");

    for (const link of matchedLinks) {
      link.addEventListener("click", this.handleClickOnRouterLinks.bind(this));
    }
  }

  _linkUrlToIdentifier(url) {
    return url.indexOf("/") === 0 ? url.slice(1) : url;
  }

  get routes() {
    return this._routes;
  }
}
