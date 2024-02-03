import React, { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;

    (async function () {
      PSPDFKit = await import("pspdfkit");
      try {
        await PSPDFKit.load({
          container,
          document: props.document, // props.document is now a Blob URL
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        });
      } catch (error) {
        console.error("Error loading PSPDFKit", error);
      }
    })();

    return () => {
      if (PSPDFKit) {
        PSPDFKit.unload(container);
        
      }
    };
  }, [props.document]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
