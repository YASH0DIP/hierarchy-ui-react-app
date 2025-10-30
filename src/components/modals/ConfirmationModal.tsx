import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onClose, onConfirm, message }) => {
  return (
    <Dialog
          open={open}
          onClose={onClose}
          maxWidth={false}
          PaperProps={{
            sx: {
              width: { xs: "90%", sm: "80%", md: "600px", lg: "700px" },
              borderRadius: 3,
              p: 1,
            },
          }}
        >
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
