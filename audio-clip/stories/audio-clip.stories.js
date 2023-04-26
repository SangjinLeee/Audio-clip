import { html } from "lit";
import "../src/audio-clip.js";

export default {
  title: "AudioClip",
  component: "audio-clip",
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <audio-clip
      style="--audio-clip-background-color: ${backgroundColor || "white"}"
      .title=${title}
    >
    </audio-clip>
  `;
}

export const App = Template.bind({});
App.args = {
  title: "My app",
};
