import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = ({ username }) => {
    useEffect(() => {
        async function getImages() {
            if (!username) return;
            const res = await axios.get(
                `https://www.instagram.com/${username}/?__a=1`
            );
            const data = await res.data.graphql.user
                .edge_owner_to_timeline_media.edges;
            setImages(data.map(({ node }) => node.thumbnail_resources));
        }

        getImages();
    }, []);

    const [images, setImages] = useState(null);
    return (
        <div className="App">
            {images &&
                images.map(res => <img src={res[1].src} alt="recent post" />)}
        </div>
    );
};

export default App;
