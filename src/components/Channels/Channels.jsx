import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import './Channels.css';
import Modal from "../Modal/Modal";

const Channels = () => {
  const INIT = {name: '', description: ''}
  const [channels, setChannels] = useState([]);
  const [newChannel, setNewChannel] = useState(INIT);
  const [modal, setModal] = useState(false);
  const { authService, chatService, appSetChannel, appSelectedChannel } = useContext(UserContext);

  useEffect(() => {
    chatService.findAllChannels().then((res) => {
      setChannels(res);
    })
  }, []);

  const selectChannel = (channel) => {
    appSetChannel(channel);
  }

  const onChange = ({ target: { name, value }}) => {
    setNewChannel({ ...newChannel, [name]: value });
  }

  const createChannel = (e) => {
    e.preventDefault();
    setNewChannel(INIT);
    setModal(false);
  }

  return (
      <>
        <div className="channel">
          <div className="channel-header">
            <h3 className="channel-label">{authService.name}</h3>
          </div>
          <h3 className="channel-label">Channels <span onClick={() => {setModal(true)}}>Add +</span></h3>
          <div className="channel-list">
            {!!channels.length ? channels.map((channel) => (
                <div
                    key={channel.id}
                    onClick={selectChannel(channel)}
                    className="channel-label"
                >
                  <div className={`inner ${appSelectedChannel.id === channel.id ? 'selected' : ''}`}>#{channel.name}</div>
                </div>
            )) : <div>No channels, please add a channel</div>  }
          </div>
        </div>
        <Modal title="Create Cnannel" isOpen={modal} close={() => setModal(false)}>
          <form action="" onSubmit={createChannel} className="form channel-form">
            <input onChange={onChange} type="text" className="form-control" name="name" placeholder="enter channel name"/>
            <input onChange={onChange} type="text" className="form-control" name="description" placeholder="enter channel description"/>
            <input type="submit" className="submit-btn" value="Create Channel"/>
          </form>
        </Modal>
      </>
  )
}

export default Channels;
