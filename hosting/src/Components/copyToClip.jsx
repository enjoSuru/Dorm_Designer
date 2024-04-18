import { useState } from "react";

function CopyToClip({value,display}) {


  const stopProp = (e) => {
    e.stopPropagation();
  };

  const [copied, setCopied]=useState(false);

  return(
    <button style={{marginRight:"0.5rem"}} onClick={async (e) =>
    {stopProp(e); await navigator.clipboard.writeText(value), setCopied(true),   setTimeout(()=>{setCopied(false);},2000);}
  }
  >{copied ? "Copied" : display}</button>
  );
}

export default CopyToClip;