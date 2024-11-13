
import { UniqueConstraintError } from 'sequelize';
import Waitlist from '../models/Newsletter.js';

//@desc     Add email for new batch waitlist
//@route    POST /api/newsletter
export const addEmail = async (req, res, next) => {

    try {
      console.log(req.body);
      
      const student = await Waitlist.create(req.body);
      res.status(201).json(student);
    } catch (error) {

      if (error instanceof UniqueConstraintError) {
        console.error('Duplicate entry error:', error.message); 
        if (error.original.code === 'ER_DUP_ENTRY') {
          // console.error('"Looks like you\'re already registered! No need to resubmit."');
          // Custom response or validation message here
         return res.status(409).json({ message: 'Looks like you\'re already registered! No need to resubmit.'});
        }
      
      res.status(500).json({ error: error.message });
    }
  }
  };