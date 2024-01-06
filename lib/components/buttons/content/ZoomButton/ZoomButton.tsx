import { FC, useLayoutEffect } from "react";
import styled from "./ZoomButton.module.scss";
import { PORTAL_APP_ID } from "../../../../constants";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import ZoomInIcon from "./../../../../assets/icons/zoom.svg?react";
import AccButton from "../../AccButton/AccButton";
import AccValueControlButton from "../../AccValueControlButton/AccValueControlButton";

const styleID = "acc-zoom-style";
const rootClass = "acc-zoom";

interface ZoomButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const ZoomButton: FC<ZoomButtonProps> = ({ accState, onChangeAccState }) => {
  const { isZoom, zoom } = accState.zoom;

  const increaseZoomHandler = () => {
    onChangeAccState((draft) => {
      draft.zoom.isZoom = true;
      draft.zoom.zoom += 0.1;
    });
  };
  const decreaseZoomHandler = () => {
    onChangeAccState((draft) => {
      if(draft.zoom.zoom > 0.1){
        draft.zoom.isZoom = true;
        draft.zoom.zoom -= 0.1;
      }
    });
  };
  const zoomInitHandler = () => {
    onChangeAccState((draft) => {
      draft.zoom.isZoom = false;
      draft.zoom.zoom = 1;
    });
  };

  useLayoutEffect(() => {
    if (zoom && isZoom) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                html.${rootClass} body *:not(#${PORTAL_APP_ID}, #${PORTAL_APP_ID} *) {
                zoom: ${zoom.toFixed(1)} !important;
               }
            `;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [zoom, isZoom]);

  return (
    <AccButton
      elementType="div"
      Icon={ZoomInIcon}
      titleTranslationKey={"content.zoom"}
      title="Zoom"
      stats={zoom ? `${(zoom * 100).toFixed(0)}%`: undefined}
    >
      <div className={styled.accZoomButton}>
        <AccValueControlButton
          onClick={increaseZoomHandler}
          controlType="increase"
        />
        <AccValueControlButton onClick={zoomInitHandler} controlType="init" />
        <AccValueControlButton
          onClick={decreaseZoomHandler}
          controlType="decrease"
        />
      </div>
    </AccButton>
  );
};

export default ZoomButton;
