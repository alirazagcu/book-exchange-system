import React,  {useState, useEffect} from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core"

function FormDialog({handleCloseCallBack, open, setSocialMediaRole}) {
    const [role, setRole] = useState("buyer")
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRole(value);
  }
  
  const onSubmitHandler = () =>{
    setSocialMediaRole(role)
    handleCloseCallBack()
  }
  return (
    <div>
      <Dialog open={open} onClose={handleCloseCallBack} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
              Please add your role so we can save you as a buyer or seller
              This is only first time popup
          </DialogContentText>
          <div className="pt-2">
            <select  onChange={handleChange} name="role" style={{background: "#111827"}} className="w-full border rounded border-gray-200 border-opacity-30 focus:outline-none focus:ring-1 focus:ring-blue-600  bg-transparent pt-2 pb-2 pl-2 outline-none text-white text-base">
              <option value="seller">Seller</option>
              <option value="buyer" selected>Buyer</option>
            </select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCallBack} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;