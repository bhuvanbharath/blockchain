import React from "react";
import VideoListItem from "./video_list_item";

const VideoList = function (props) 
{
    return(
        <ul className="col-md-4 list-group">
            {props.videos.map((video) =>{
                return (
                <VideoListItem 
                onVideoSelect = {props.onVideoSelect}
                key={video.etag} video={video} />
                );
            })}
        </ul>
    );
};

export default VideoList;