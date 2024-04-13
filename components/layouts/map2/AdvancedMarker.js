/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
// Based on https://github.dev/visgl/react-google-maps because the original package is not maintained anymore and misses advanced markers

/* eslint-disable complexity */
import React, {
  Children,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState
} from 'react';

import { createPortal } from 'react-dom';

import type { Ref, PropsWithChildren } from 'react';
import { MapContext } from '@react-google-maps/api';

// export interface AdvancedMarkerContextValue {
//   marker: google.maps.marker.AdvancedMarkerElement;
// }

export const AdvancedMarkerContext =
  React.createContext(null);

// type AdvancedMarkerEventProps = {
//   onClick?: (e: MouseEvent) => void;
//   onRightClick?: (e: MouseEvent) => void;
//   onDrag?: (e: google.maps.MapMouseEvent) => void;
//   onDragStart?: (e: google.maps.MapMouseEvent) => void;
//   onDragEnd?: (e: google.maps.MapMouseEvent) => void;
// };

// export type AdvancedMarkerProps = PropsWithChildren<
//   Omit<google.maps.marker.AdvancedMarkerElementOptions, 'gmpDraggable'> &
//   AdvancedMarkerEventProps & {
//       /**
//        * className to add a class to the advanced marker element
//        * Can only be used with HTML Marker content
//        */
//       className?: string;
//       anchorAbove?: boolean;
//       draggable?: boolean;
//       clickable?: boolean; // right now this just deactivates the onClick handler but does not change the google maps marker behaviour
//   }
// >;

// export type AdvancedMarkerRef = google.maps.marker.AdvancedMarkerElement | null;
function useAdvancedMarker(props) {
  const [marker, setMarker] = useState(null);
  const [contentContainer, setContentContainer] = useState(null);

  const map = useContext(MapContext);
  const markerLibrary = google.maps.marker

  const {
      children,
      className,
      anchorAbove,
      onClick,
      onRightClick,
      onDrag,
      onDragStart,
      onDragEnd,
      collisionBehavior,
      draggable,
      clickable,
      position,
      title,
      zIndex
  } = props;

  const numChilds = Children.count(children);

  // create marker instance and add it to the map when map becomes available
  useEffect(() => {
      if (!map || !markerLibrary) return;

      const newMarker = new markerLibrary.AdvancedMarkerElement();
      newMarker.map = map;

      setMarker(newMarker);

      // create container for marker content if there are children
      if (numChilds > 0) {
          const el = document.createElement('div');
          if (!anchorAbove) el.style.transform = 'translate(0, 50%)';
          if (className) el.className = className;

          newMarker.content = el;

          setContentContainer(el);
      }

      return () => {
          newMarker.map = null;
          setMarker(null);
          setContentContainer(null);
      };
      // We do not want to re-render the whole marker when the className changes
      // because that causes a short flickering of the marker.
      // The className update is handled in the useEffect below.
      // Excluding the className from the dependency array onm purpose here
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, markerLibrary, numChilds]);

  useEffect(() => {
      if ((className?.includes('translate') || className?.includes('transform')) && !anchorAbove) console.warn("not setting anchorAbove automatically set 'transform: translate(0, 50%)' to center the marker on the position. Set this to false to be able to use custom translate values.");
  }, [className, anchorAbove]);


  // update className of advanced marker element
  useEffect(() => {
      if (!contentContainer) return;
      contentContainer.className = className ?? '';
  }, [contentContainer, className]);

  // bind all marker events
  useEffect(() => {
      if (!marker) return;

      const gme = google.maps.event;

      const controller = new AbortController();
      const { signal } = controller;

      // TODO fix the type mismatch for click and contextmenu events
      // marker.addEventListener("gmp-click", (e: google.maps.marker.AdvancedMarkerClickEvent) => { console.log(e) }); // only available in beta and misses some properties, check https://issuetracker.google.com/issues/331684436

      if (onClick && clickable) gme.addListener(marker, 'click', (e: { domEvent: PointerEvent }) => onClick(e.domEvent));
      if (onRightClick && clickable) marker.content?.addEventListener('contextmenu', onRightClick, { signal }); // setting marker.addEventListener directly onces this is out of beta
      if (onDrag && draggable) gme.addListener(marker, 'drag', onDrag);
      if (onDragStart && draggable) gme.addListener(marker, 'dragstart', onDragStart);
      if (onDragEnd && draggable) gme.addListener(marker, 'dragend', onDragEnd);

      if ((onDrag || onDragStart || onDragEnd) && !draggable) {
          console.warn(
              'You need to set the marker to draggable to listen to drag-events.'
          );
      }

      if ((onClick && !clickable) || (onRightClick && !clickable)) {
          console.warn(
              'You need to set the marker to clickable to listen to click-events.'
          );
      }

      const m = marker;
      return () => {
          gme.clearInstanceListeners(m); // for addListener
          controller.abort(); // for addEventListener
      };
  }, [marker, draggable, onClick, onDragStart, onDrag, onDragEnd, onRightClick, clickable]);

  // update other marker props when changed
  useEffect(() => {
      if (!marker) return;

      if (position !== undefined) marker.position = position;
      if (draggable !== undefined) marker.gmpDraggable = draggable;
      // use marker.gmpClickable once this is resolved https://issuetracker.google.com/issues/331684436
      if (collisionBehavior !== undefined)
          marker.collisionBehavior = collisionBehavior;
      if (zIndex !== undefined) marker.zIndex = zIndex;
      if (typeof title === 'string') marker.title = title;
  }, [marker, position, draggable, collisionBehavior, zIndex, title, clickable]);

  return [marker, contentContainer] as const;
}

const AdvancedMarkerComponent = forwardRef(
  (props: AdvancedMarkerProps, ref: Ref<AdvancedMarkerRef>) => {
      const { children } = props;
      const [marker, contentContainer] = useAdvancedMarker(props);

      const advancedMarkerContextValue: AdvancedMarkerContextValue | null =
          useMemo(() => (marker ? { marker } : null), [marker]);

      useImperativeHandle(ref, () => marker, [marker]);

      if (!marker) {
          return null;
      }

      // we could add other props here to the context, but lets try to achieve this with tailwind group or other means first
      return (
          <AdvancedMarkerContext.Provider value={advancedMarkerContextValue}>
              {contentContainer !== null && createPortal(children, contentContainer)}
          </AdvancedMarkerContext.Provider>
      );
  }
);
AdvancedMarkerComponent.displayName = 'AdvancedMarker';
export const AdvancedMarker = AdvancedMarkerComponent;


// eslint-disable-next-line react-refresh/only-export-components
export function useAdvancedMarkerRef() {
  const [marker, setMarker] =
      useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  const refCallback = useCallback((m: AdvancedMarkerRef | null) => {
      setMarker(m);
  }, []);

  return [refCallback, marker] as const;
}
