import React, { useState } from "react";
import './Channels.css';

const Channels = () => {
  const channelList = ['channel1', 'channel2', 'channel3'];
  const [channels, setChannels] = useState(channelList);
  return (
      <div className="channel">
        <div className="channel-header">
          <h3 className="channel-label">Username</h3>
        </div>
        <h3 className="channel-label">Channels <span>Add +</span></h3>
        <div className="channel-list">
          {channels.map((channel) => (
              <div className="channel-label">
                <div className="inner">#{channel}</div>
              </div>
          ))}
        </div>
      </div>
  )
}

export default Channels;
