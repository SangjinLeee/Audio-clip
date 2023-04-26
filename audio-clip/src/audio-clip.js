import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";

// https://github.com/elmsln/issues/issues/1102

class AudioClip extends LitElement {
  static properties = {
    icon: { type: String },
    size: { type: Number },
    volume: { type: Number },
    playing: { type: Boolean },
    url: { type: String },
    playedratio: { type: Number },
  };

  static styles = css`
    span {
      margin: 0px 4px;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.15) 0%,
        rgba(0, 0, 0, 0.05) 0
      );
      border-radius: 4px;
      font-family: sans-serif;
    }

    #audio {
      display: none;
    }
  `;

  constructor() {
    super();
    this.icon = "av:play-arrow"; // av:play-arrow av:pause
    this.size = 18;
    this.volume = 1;
    this.playing = false;
    this.url = "./assets/file_example_MP3_700KB.mp3";
  }

  onPlay() {
    this.audioDom.play();
    this.playing = true;
    this.icon = "av:pause";
  }
  onPause() {
    this.audioDom.pause();
    this.playing = false;
    this.icon = "av:play-arrow";
  }

  onEnded() {
    this.onPause();
    this.audioDom.currentTime = 0;
    this.spanDom.style.background = this.getAudioStyle(0);
  }

  onToggle() {
    if (this.playing) {
      this.onPause();
    } else {
      this.onPlay();
    }
  }

  getAudioStyle(percent) {
    return `linear-gradient(to right, rgba(0, 0, 0, 0.15) ${percent}%, rgba(0, 0, 0, 0.05) 0)`;
  }

  get playedratio() {
    return (this.audioDom.currentTime / this.audioDom.duration) * 100;
  }

  highlight() {
    if (this.playing) {
      this.spanDom.style.background = this.getAudioStyle(this.playedratio);
    }
  }

  firstUpdated() {
    this.audioDom = this.shadowRoot.getElementById("audio");
    this.iconDom = this.shadowRoot.getElementById("icon");
    this.spanDom = this.shadowRoot.querySelector("span");
    this.audioDom.volume = this.volume;

    this.iconDom.addEventListener("click", this.onToggle.bind(this));
    this.audioDom.addEventListener("ended", this.onEnded.bind(this));
    setInterval(this.highlight.bind(this), 50);
  }

  render() {
    return html`
      <span style="font-size:${this.size}px">
        <audio id="audio" preload="auto">
          <source src="${this.url}" />
        </audio>
        <simple-icon
          id="icon"
          accent-color="black"
          style="--simple-icon-width:${this.size}px; --simple-icon-height:${this
            .size}px;"
          icon="${this.icon}"
        ></simple-icon>
        <slot></slot>
      </span>
    `;
  }
}

customElements.define("audio-clip", AudioClip);
