import express from 'express';
import CompanyModel from '../../models/company';

const companyRouter = express.Router();

companyRouter.get('/', async (req, res) => {
  try {
    let companies;
    if (req.query.sectorName) {
      companies = await CompanyModel.getAllBySector(req.query.sectorName);
    } else {
      companies = await CompanyModel.getAll();
    }
    res.status(200).send(companies);
  } catch (err) {
    res.send(err);
  }
});

export default companyRouter;
