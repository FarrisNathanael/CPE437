import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./scripts/styles/reset.css.ts";


export class GameElement extends LitElement {
	@property ({ type: String, attribute: "cover-src", reflect: true}) coverSrc = "";
	
	@property ({ type: String, reflect: true }) href = '#';

	@property ({ type: Number, attribute: "player-min", reflect: true }) playersMin?: number;
	@property ({ type: Number, attribute: "player-max", reflect: true }) playersMax?: number;
	@property ({ type: Number, attribute: "duration", reflect: true }) duration?: number;
	@property ({ type: String, reflect: true }) status?: "In Progress" | "Completed" | "NEW" | string;
	@property ({ type: String, attribute: "last-edited", reflect: true }) lastEdited?: string;

	private playersText() {
        const { playersMin, playersMax } = this;
        if (playersMin && playersMax) return `${playersMin}-${playersMax} players`;
        if (playersMin) return `${playersMin}+ players`;
		if (playersMax) return `Up to ${playersMax} players`;
		return null;
	}

    private durationText() {
        const { duration } = this;
        if (duration) return `Approx. ${duration} min`;
        return null;
    }

	override render() {

        const players = this.playersText();
        const duration = this.durationText();

		return html`
            <a class="card" href=${this.href} aria-label="Game">
                <div class="body">
                    <h3 class="title"><slot></slot></h3>
                    <p class="subtitle"><slot name="subtitle"></slot></p>
                    
                    <div class="meta">
                        ${players ? html`<span class="pill" aria-label="Players">${players}</span>` : null}
                        ${duration ? html`<span class="pill" aria-label="Duration">${duration}</span>` : null}
                        ${this.lastEdited
                                ? html`<time class="pill" datetime=${this.lastEdited}>
                       Last played: ${this.lastEdited}
                     </time>`
                                : null}
                        <slot name="meta"></slot>
                    </div>

                    <div class="actions">
                        <slot name="actions"></slot>
                    </div>
                    <div class="media">
                        ${this.coverSrc
                                ? html`<img src=${this.coverSrc} alt="" >`
                                : html`<div class="placeholder" aria-hidden="true" ></div>`}
                        ${this.status
                                ? html`<span class="badge" >${this.status}</span>`
                                : null}
                    </div>
                </div>
            </a>
		`;
	}
	static styles = [
        reset.styles,
        css`
        :host {
            display: block;            /* so it can live inside a <ul> cleanly */
            color: inherit;
        }

        :host([role="listitem"]) {
            display: list-item;
            margin-left: 1.25rem;
        }
        .media {
            position: relative;
            //aspect-ratio: 16 / 9;
            width: 200px;
            height: 200px;
            background: #f2f2f2;
            overflow: hidden;
        }
        .card {
            display: grid;
            gap: .75rem;
            text-decoration: none;
            color: inherit;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(0,0,0,0.08);
            background: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            transition: transform .12s ease, box-shadow .12s ease;
        }
        
        img, .placeholder { width: 100%; height: 100%; object-fit: cover; display: block; }
        .badge {
            position: absolute; bottom: 8px; right: 8px;
            padding: .3rem .55rem; border-radius: 999px;
            background: #000; color: #fff;
            font-size: .75rem; font-weight: 600;
        }
        .pill {
            display: inline-block; padding: .25rem .5rem; border-radius: 999px;
            border: 1px solid rgba(0,0,0,0.12); font-size: .8rem;
            background: #fafafa;
        }
        .meta { margin-top: .5rem; display: flex; gap: .5rem; flex-wrap: wrap; }
        .body { padding: 1rem; }
        .title { margin: 0; font-size: 1.1rem; line-height: 1.2; }
        .actions { margin-top: .75rem; display: inline-flex; gap: .5rem; flex-wrap: wrap; }
        
    `];


}
