import React, { useContext } from 'react'
import App from '../App'
import { Context } from '../App'
import './card.scss'
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      display               : 'flex',
      flexDirection         : 'column',

    }
  };

Modal.setAppElement('#root')

export default function Card(data) {
    let subtitle
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal(){
        setIsOpen(false);
      }

    const {item} = data
    // console.log(item)
    return (
        <div className="card-body" id="card-body">
            <button className="btn btn-success mb-2" onClick={openModal}>Open Info</button>
            <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
                <button className="btn btn-danger mb-2" onClick={closeModal}>close</button>
                <span>{item.name}</span>
                <span>{item.status}</span>
                <span>{item.species}</span>
                <span>{item.type}</span>

                <span>{item.created}</span>
                <a href={item.url}>{item.url}</a>

            </Modal>
            
            <h6 className="card-title">{item.name}</h6>
            {item.image ? <img className="card-img" src={item.image} /> : ''}
            {item.air_date ? <span>{item.air_date}</span> : ''}
            {item.dimension ? <span>{item.dimension}</span> : ''}
        </div>
    )
}