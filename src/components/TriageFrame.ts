interface Props {
  triageUrl: string;
}

async function getToken(secretURL: string) {
  // Calls proxy for token
  const request = await fetch(secretURL);
  const { token } = await request.json();

  return token;
}

export default async function setupTriageFrame(props: Props, selector: string) {
  const parent = document.querySelector(selector);
  const head = document.querySelector("head");
  const token = await getToken("/proxy/secret");

  const iFrame = document.createElement("iframe");
  const iFrameResizer = document.createElement("script");
  const triageURL = `${props.triageUrl}?token=${token}`;

  iFrame.setAttribute("src", triageURL);
  iFrame.setAttribute("id", "sc-frame");
  iFrameResizer.setAttribute("src", `${props.triageUrl}/iframeResizer.js`);

  parent?.appendChild(iFrame);
  head?.append(iFrameResizer);

  window.addEventListener("message", ({ data, origin }) => {
    if (origin !== props.triageUrl) return;

    try {
      // HERE YOU CAN HANDLE YOUR EXPORTER EVENTS
      const eventJSON = JSON.parse(data);
      console.log(eventJSON);
    } catch {}
  });
}
