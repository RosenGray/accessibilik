import { createPortal } from "react-dom";
import { ReactNode, useLayoutEffect, useState } from "react";

const PORTAL_ID = "portal";

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

interface PortalProps {
  children: ReactNode;
  wrapperElementId?: string;
  [key: string]: unknown;
}

const Portal = ({ children, wrapperElementId }: PortalProps): React.ReactPortal | null => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let portal = document.getElementById(wrapperElementId ?? PORTAL_ID);
    let systemCreated = false;

    if (!portal) {
      systemCreated = true;
      portal = createWrapperAndAppendToBody(wrapperElementId ?? PORTAL_ID);
    }

    setWrapperElement(portal);

    return () => {
      // delete the programmatically created element
      if (systemCreated && portal && portal.parentNode) {
        portal.parentNode.removeChild(portal);
      }
    };
  }, [wrapperElementId]);

  if (wrapperElement === null) return null;
  return createPortal(children, wrapperElement);
};

export default Portal;