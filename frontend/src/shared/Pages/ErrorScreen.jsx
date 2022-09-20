import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Redirect } from 'react-router-dom';
import { Paths } from '../../Routes';
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ErrorScreen(props) {
  const [open, setOpen] = useState(true);
  const [redirect, setRedirect] = useState(false)
  const handleClose = () => {
    setOpen(false);
    setRedirect(true)
  }

  return (
    <div>
        {redirect && <Redirect to={Paths.Login} />}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Alguma coisa deu errado, Clique na tela para ser redirecionado.
          </Typography>
          <Button onClick={handleClose}>Voltar para o Login </Button>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.error}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}