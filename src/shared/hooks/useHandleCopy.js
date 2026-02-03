import { useState } from "react";


export default function useHandleCopy() {
    const [copiedId, setCopiedId] = useState(null);

    function handleCopy(id) {
        const idString = String(id);
        navigator.clipboard.writeText(idString);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return { handleCopy, copiedId }


}