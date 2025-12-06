import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../scripts/styles/reset.css.ts";
import headings from "../scripts/styles/headings.css.ts";

interface LoginFormData {
    username?: string;
    password?: string;
}

export class LoginFormElement extends LitElement {

    @state()
    formData: LoginFormData = {};

    @property()
    api?: string;

    @property()
    redirect: string = "/";

    @state()
    error?: string;

    get canSubmit(): boolean {
        return Boolean(this.api && this.formData.username &&
            this.formData.password);
    }

    override render() {
        return html`
      <form
        @change=${(e: InputEvent) => this.handleChange(e)}
        @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Login
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `;
    }

    static styles = [
        reset.styles,
        headings.styles,
        css`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
  `];

  //   static styles = [
  //       reset.styles,
  //       headings.styles,
  //       css`
  //   form {
  //     display: flex;
  //     flex-direction: column;
  //     gap: var(--spacing-sm);
  //   }
  //
  //   label {
  //     display: flex;
  //     flex-direction: column;
  //     gap: 0.25rem;
  //   }
  //
  //   label span {
  //     font-size: 0.9rem;
  //     font-weight: 500;
  //   }
  //
  //   input {
  //     padding: 0.35rem 0.5rem;
  //     border-radius: 6px;
  //     border: 1px solid var(--border-color);
  //     font: inherit;
  //   }
  //
  //   button[type="submit"] {
  //     margin-top: var(--spacing-sm);
  //     padding: 0.4rem 0.9rem;
  //     border-radius: 999px;
  //     border: none;
  //     background-color: var(--header-background-color);
  //     color: var(--text-color);
  //     cursor: pointer;
  //     transition: background-color 0.2s, transform 0.1s;
  //   }
  //
  //   button[type="submit"]:hover:not(:disabled) {
  //     background-color: var(--link-bg-hover);
  //     transform: scale(1.03);
  //   }
  //
  //   button[type="submit"]:disabled {
  //     opacity: 0.6;
  //     cursor: not-allowed;
  //   }
  //
  //   .error:not(:empty) {
  //     color: var(--color-error);
  //     border: 1px solid var(--color-error);
  //     padding: var(--size-spacing-medium);
  //   }
  // `
  //   ];


    handleChange(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        const name = target?.name;
        const value = target?.value;
        const prevData = this.formData;

        switch (name) {
            case "username":
                this.formData = { ...prevData, username: value };
                break;
            case "password":
                this.formData = { ...prevData, password: value };
                break;
        }
    }

    handleSubmit(submitEvent: SubmitEvent) {
        submitEvent.preventDefault();

        if (this.canSubmit) {
            fetch(
                this?.api || "",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.formData)
                }
            )
                .then((res) => {
                    if (res.status !== 200)
                        throw "Login failed";
                    else return res.json();
                })
                .then((json: object) => {
                    const { token } = json as { token: string };
                    const customEvent = new CustomEvent(
                        'auth:message', {
                            bubbles: true,
                            composed: true,
                            detail: [
                                'auth/signin',
                                { token, redirect: this.redirect }
                            ]
                        });
                    console.log("dispatching message", customEvent);
                    this.dispatchEvent(customEvent);
                })
                .catch((error: Error) => {
                    console.log(error);
                    this.error = error.toString();
                });
        }
    }

    // more to come...
}