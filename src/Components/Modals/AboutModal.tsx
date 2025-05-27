import { IconInfoCircle } from "@tabler/icons-react";
import styled from "styled-components";
import { Modal } from "../Modal";

const MainDiv = styled.div`
  max-width: 100%;

  display: flex;
  align-items: flex-start;
  gap: var(--padding-large);

  @media (max-width: 840px), (max-height: 500px) {
    flex-direction: column;
    align-items: center;
    gap: 1em;
  }

  & img {
    max-width: 100%;
    display: block;
  }
  & p {
    margin-right: 2em;
  }
`;

export function AboutModal({ close }: { close: () => void }) {
  return (
    <Modal
      onClose={close}
      title="About"
      icon={IconInfoCircle}>
      <MainDiv>
        <img
          src="/demo_avatar.gif"
          alt="demo of my avatar floating around"
        />
        <div>
          <p>
            Hi ! I'm julien and this is <b>Node Painter</b>, a tool to make visuals and animation programaticaly through a graph based editor.
          </p>
          <p>
            To get started, you might want to look at the <a href="https://github.com/grifdail/NodePainter">github repo</a> for a basic rundown of the tool and the nodes availables.
          </p>
          <p>
            The tool is currently still in beta and lacking documentation. To keep being updated please follow me on the <a href="https://social.grifdail.fr/@grifdail">fediverse</a>. <br />
            Please send me anything you make with it, or use the hastag #nodepainter. Don't hesitate to ask me for help or feature request.
          </p>
          <p>PS: This app obviously use localStorage (aka cookie) to store your data but that's it. No data is collected. No third party is involved. To delete your data, juste erase your browser history. Consider this warning my official cookie policy.</p>
        </div>
      </MainDiv>
    </Modal>
  );
}
