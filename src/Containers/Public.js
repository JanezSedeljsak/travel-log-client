import React from 'react';
import PaperPlane from '../Components/PaperPlane';
import Banner from './../assets/banner.jpg';

export default () => {
    return (
        <>
            <div id="landing">
                <img id="banner-img" src={Banner} />
                <h1>Welcome to Travel Log</h1>
                <p>~ Pass on the beautiful memories you've made around the world ~</p>
                <PaperPlane />
                <div id="about-us">
                    <div id="about-us-title">
                        <h1>About us</h1>
                    </div>
                    <div id="about-us-content">
                        <p className="qoute">
                            Ask this question to 50 different people, and you’ll likely get 50 different answers. The dictionary can’t even make up its mind; definitions include: “to go,” “to journey,” “to move in a given direction.” All of these certainly seem vaguely like travel. But, I’d hazard to say that travel is much more than just movement.
                        </p>
                        <p className="qoute">
                            “To journey” would perhaps hone in on my definition of travel. It implies moving or going away from one place and ending in another, with some kind of meaningful experience in between. This is definitely the essence of travel. But travel is not that clear-cut.
                        </p>
                        <p className="qoute">
                        There is not just one kind of journey. There are the sorts of journeys that have set itineraries and destinations — like a cruise, or guided tour, where the traveler is simply along for the ride. And then there are the sorts of journeys that lack a roadmap, or perhaps consist only loosely of destinations and plans. These sorts of journeys can change at any point along the road; they can adapt, and often force the traveler to adapt along with them.
                        </p>
                    </div>
                </div>
            </div>
        </>

    )
}