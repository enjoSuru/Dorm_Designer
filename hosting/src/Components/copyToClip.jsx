import { useState } from "react";

// Component for copying text to clipboard
function CopyToClip({ value, display }) {
  // Function to stop event propagation
  const stopProp = (e) => {
    e.stopPropagation();
  };

  // State to track if text is copied
  const [copied, setCopied] = useState(false);

  return (
    <button
      style={{ marginRight: "0.5rem" }}
      onClick={async (e) => {
        stopProp(e); // Prevent event propagation
        await navigator.clipboard.writeText(value); // Write text to clipboard
        setCopied(true); // Set copied state to true
        setTimeout(() => {
          setCopied(false); // Reset copied state after 2 seconds
        }, 2000);
      }}
    >
      {/* Button text changes based on copied state */}
      {copied ? "Copied" : display}
    </button>
  );
}

export default CopyToClip; // Exporting CopyToClip component
