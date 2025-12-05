import { html, LitElement } from "lit"; // css
import { state } from "lit/decorators.js";
import { Auth, Observer, Events } from "@calpoly/mustang";
//import reset from "./styles/reset.css.ts";
//import headings from "./styles/headings.css.ts";

export class HeaderElement extends LitElement {
    // 👇 this name must match `provides="..."` in <mu-auth> (e.g., "bgp:auth")
    _authObserver = new Observer<Auth.Model>(this, "bgp:auth");

    @state()
    loggedIn = false;

    @state()
    userid?: string;

    connectedCallback() {
        super.connectedCallback();

        this._authObserver.observe((auth: Auth.Model) => {
            const { user } = auth;

            if (user && user.authenticated) {
                this.loggedIn = true;
                this.userid = user.username;
            } else {
                this.loggedIn = false;
                this.userid = undefined;
            }
        });
    }

    renderSignOutButton() {
        return html`
      <button
        @click=${(e: UIEvent) => {
            // send "auth/signout" message up to <mu-auth>
            Events.relay(e, "auth:message", ["auth/signout"]);
        }}
      >
        Sign Out
      </button>
    `;
    }

    renderSignInButton() {
        return html`
      <a href="/login.html">Sign In…</a>
    `;
    }

    render() {
        return html`
      <header class="site-header">
        <span class="brand">
<!--          <a href="/index.html" class="logo">-->
<!--            <img-->
<!--              src="/assets/Website_Logo.png"-->
<!--              alt="Two cards with colors with a die between them"-->
<!--            />-->
<!--          </a>-->
          <span class="site-title">Account</span>
        </span>

        <div class="user-area">
          <span class="greeting">
            Hello, ${this.userid || "player"}
          </span>
          ${this.loggedIn
            ? this.renderSignOutButton()
            : this.renderSignInButton()}
        </div>
      </header>

      <!-- Optional: let pages inject nav below header -->
      <slot name="navbar"></slot>
    `;
    }
}