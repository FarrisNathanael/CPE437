//      saves.ts        //

import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
// import { GameElement} from "./games.ts";

interface GameData{
    name: string;
    link: string;
    coverSrc: string;
    playersMin: number;
    playersMax: number;
    duration: number;
    status: string;
    lastEdited: string;
}


export class SavesElement extends LitElement {
    @property()
    src?: string;

    @state() games: Array<GameData> = [];

    connectedCallback() {
        super.connectedCallback();
        if (this.src) this.hydrate(this.src);
    }


    hydrate(src: string) {
        fetch(src)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json: unknown) => {
                if (Array.isArray(json)) {
                    this.games = json as GameData[];
                } else if (json && typeof json === "object" && "games" in (json as any)) {
                    this.games = (json as any).games as GameData[];
                } else {
                    console.warn("Unexpected JSON shape", json);
                    this.games = [];
                }
            })
            .catch(err => console.error("hydrate failed:", err));
    }


    render() {
        return html`
            <section class="games">
                ${this.games.map(
                        (g) => html`
            <bgp-game
              cover-src=${g.coverSrc}
              href=${g.link}
              player-min=${g.playersMin}
              player-max=${g.playersMax}
              duration=${g.duration}
              status=${g.status}
              last-edited=${g.lastEdited}
            >
              ${g.name}
              <span slot="subtitle">${g.playersMin}-${g.playersMax} players</span>
            </bgp-game>
          `
                )}
            </section>
    `;
  }
}