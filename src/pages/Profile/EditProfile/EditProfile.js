import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Avatar } from "@mui/material";
import TextField from '@mui/material/TextField';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './EditProfile.css'
import axios from 'axios'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 8,
}

function EditBadge() {

  // const handleRadio = (e) => {
  //   setApplyBadge(!applybadge)
  // }

  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='badge-section' onClick={handleOpen}>
        <text>Apply</text>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="badge-modal-title"
        aria-describedby="badge-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 400 }}>
          <div className='text'>
            <h2>You have to pay the verification fees of (Rs. 1000) for this application</h2>
            <p>After the application you will be verified by our team.
              You may be contacted and asked some questions before succesful verification of your account.
            </p>
            {/* <Button className='e-button'>Edit</Button> */}
            <Button className='e-button'><a href='https://buy.stripe.com/test_28o8A23yugPI4Q8eUU'>Pay and Apply</a></Button>
            </div>
        </Box>
      </Modal>
    </>
  );
}

function EditChild({ dob, setDob }) {

  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='birthdate-section' onClick={handleOpen}>
        <text>Edit</text>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 400 }}>
          <div className='text'>
            <h2>Edit date of birth?</h2>
            <p>This can only be changed a few times.<br />
              Make sure you enter the age of the <br />
              person using the account. </p>
            {/* <Button className='e-button'>Edit</Button> */}
            <input
              type="date"
              onChange={e => setDob(e.target.value)}
            />
            <Button className='e-button' onClick={() => { setOpen(false); }}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </>
  );

}
function EditProfile({ user, loggedInUser }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [dob, setDob] = useState('');


  const handleSave = async () => {
    const editedInfo = {
      name,
      bio,
      location,
      website,
      dob,
    }
    if (editedInfo) {
      await axios.patch(`https://twitter-clone-backend-hyxq.onrender.com/userUpdates/${user?.email}`, editedInfo)
      setOpen(false);
    }
  }
  return (
    <div>
      <button className='Edit-profile-btn' onClick={() => setOpen(true)}>Edit Profile</button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal">
          <div className='header'>
            <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
            <h2 className='header-title'>Edit Profile</h2>
            <button className='save-btn' onClick={handleSave}>Save</button>
          </div>
          <form className='fill-content'>
            <TextField className='text-field' fullWidth label="Name" id="fullWidth" variant='filled' onChange={(e) => setName(e.target.value)} defaultValue={loggedInUser[0]?.name ? loggedInUser[0].name : ''} />

            <TextField className='text-field' fullWidth label="Bio" id="fullWidth" variant='filled' onChange={(e) => setBio(e.target.value)} defaultValue={loggedInUser[0]?.bio ? loggedInUser[0].bio : ''} />
            <TextField className='text-field' fullWidth label="Location" id="fullWidth" variant='filled' onChange={(e) => setLocation(e.target.value)} defaultValue={loggedInUser[0]?.location ? loggedInUser[0].location : ''} />
            <TextField className='text-field' fullWidth label="Website" id="fullWidth" variant='filled' onChange={(e) => setWebsite(e.target.value)} defaultValue={loggedInUser[0]?.website ? loggedInUser[0].website : ''} />
          </form>
          <div className='badge-section'>
            <p>Apply For Verified Badge</p>
            <EditBadge/>
          </div>
          <div className='birthdate-section'>
            <p>Birth Date</p>
            <p>.</p>
            <EditChild dob={dob} setDob={setDob} />
          </div>
          <div className='last-section'>
            {
              loggedInUser[0]?.dob ?
                <h2>{loggedInUser[0]?.dob}</h2> :
                <h2>
                  {
                    dob ? dob : "Add Your date of Birth"
                  }
                </h2>
            }
            <div className='last-btn'>
              <h2>
                Switch to Professional
              </h2>
              <ChevronRightIcon />
            </div>
          </div>

        </Box>
      </Modal>
    </div>
  )
}

export default EditProfile