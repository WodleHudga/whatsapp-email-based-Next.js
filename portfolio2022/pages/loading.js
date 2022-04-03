import React from 'react';
import {Circle} from "better-react-spinkit";
function Loading() {
    return (
        <center style={{display: "grid", placeItems: "center", height: "100vh" }}>
            <div>
                <img src="http://pngimg.com/uploads/whatsapp/whatsapp_PNG21.png"
                     alt=""
                     style={{ marginBottom: 10}}
                     height={200}
                />
            </div>
            <Circle  size={70} />

        </center>
    );
}

export default Loading;