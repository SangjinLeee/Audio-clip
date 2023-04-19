import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/simple-colors/simple-colors.js";

const logo = new URL("../assets/open-wc-logo.svg", import.meta.url).href;

class AudioClip extends LitElement {
  static properties = {
    header: { type: String },
  };

  static styles = css`
    :host {
      .textbox {
        font-size: 13px;
      }
    }
  `;
  // --------CSS for content box

  constructor() {
    super();
    this.text = "hello";
    this.isPlay = false;
    this.isView = false;
  }

  get audioText() {
    return this.text;
  }

  audioTextChange(e) {
    this.text = e.target.value;
    this.requestUpdate();
  }
  // audio local path: "C:\Users\johns\Documents\GitHubb\Audio-clip\audio-clip\assets\file_example_MP3_700KB.mp3"
  render() {
    return html`
      <main>
        <input @input=${this.audioTextChange} value=${this.audioText} />
        <button
          @click=${() => {
            this.isView = !this.isView;
            this.requestUpdate();
          }}
        >
          View
        </button>
        <audio preload=${true}>
          <source src="./assets/file_example_MP3_700KB.mp3" type="audio/mpeg" />
        </audio>
        ${this.audioText.length > 0 && this.isView
          ? html` <p>
              Example code - Hello World
              <span>${this.audioText}</span>
              Example code 2 - Audio Clip
            </p>`
          : null}
      </main>
    `;
  }
}

customElements.define("audio-clip", AudioClip);
