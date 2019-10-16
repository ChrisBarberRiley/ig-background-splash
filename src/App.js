import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import "./App.css";

const App = ({ username }) => {
    const [images, setImages] = useState(null);
    const [imageDimensions, setImageDimensions] = useState(0);

    // Upon the initial load go and grab the images from instagram
    useEffect(() => {
        async function getImages() {
            const res = await axios.get(
                `https://www.instagram.com/${username}/?__a=1`
            );
            const data = await res.data.graphql.user
                .edge_owner_to_timeline_media.edges;
            setImages(data.map(({ node }) => node.thumbnail_resources));
        }

        getImages();
        // eslint-disable-next-line
    }, []);

    //Set the image dimensions (to stretch the screen)
    function getImageDimensions() {
        if (!images) {
            setImageDimensions(0);
        } else {
            setImageDimensions(
                Math.sqrt(
                    (window.innerHeight * window.innerWidth) / images.length
                )
            );
            // Testing purposes for the moment
            console.log(
                Math.sqrt(
                    (window.innerHeight * window.innerWidth) / images.length
                )
            );
        }
    }

    // get the correct dimensions for the images,
    //note we've added an event listener to watch for a screen resize
    useEffect(getImageDimensions, [images]);
    window.addEventListener("resize", getImageDimensions);

    const Container = styled.div`
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-wrap: wrap;
        position: fixed;
    `;

    const Panel = styled.div`
        height: ${imageDimensions}px;
        width: ${imageDimensions}px;
        flex-grow: 1;
    `;

    const Item = styled.img`
        object-fit: cover;
        height: 100%;
        width: 100%;
    `;

    return (
        <Container>
            {images &&
                images.map(res => (
                    <Panel key={res[1].src}>
                        <Item src={res[1].src} alt="recent post" />
                    </Panel>
                ))}
        </Container>
    );
};

export default App;
