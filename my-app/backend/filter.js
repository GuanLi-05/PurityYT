import express from 'express'

///////////////////////////////////
// Route exporting for app.js
///////////////////////////////////

export const filterResultsRouter = express.Router();
export const filterVideoRouter = express.Router();

///////////////////////////////////
// Routes
///////////////////////////////////

filterVideoRouter.post('/filter/video', (req, res) => {
  const { instruction } = req.body;
  console.log("i: " + instruction);
})