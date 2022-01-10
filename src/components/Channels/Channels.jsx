import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import './Channels.css';

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const { chatService } = useContext(UserContext);

  useEffect(() => {
    chatService.findAllChannels().then((res) => {
      setChannels(res);
    })
  }, []);


  return (
      <div className="channel">
        <div className="channel-header">
          <h3 className="channel-label">Username</h3>
        </div>
        <h3 className="channel-label">Channels <span>Add +</span></h3>
        <div className="channel-list">
          {!!channels.length ? channels.map((channel) => (
              <div className="channel-label">
                <div className="inner">#{channel.name}</div>
              </div>
          )) : <div>No channels, please add a channel</div>  }
        </div>
      </div>
  )
}

export default Channels;
