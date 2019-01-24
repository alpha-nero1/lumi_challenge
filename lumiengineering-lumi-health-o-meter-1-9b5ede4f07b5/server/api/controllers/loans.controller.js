// Imports.
import { connect } from 'net';
import Loan from '../../models/loan';

var mongoose = require('mongoose')

// Create mongo connection
var mongourl = 'mongodb://localhost:27017/lumi-health-meter'
mongoose.createConnection(mongourl, (error) => {
  if (error) { console.log(error) }
})

var all_loans = Loan
const health_values = [0, 50, 80, 110] // last pos is extra position workaround 

/**
 * Get all Loans
 * @param req
 * @param res
 * @returns void
 */

// Triggered by /loans
export async function get_loans(req, res) { 
  const filtered_data = await get_data(req)
  return res.send(filtered_data)
}

// Triggered by /loans_industries
export async function get_industries(req, res) { 
  const industry_data = await all_loans.distinct('industry')
  return res.send(industry_data)
}

// get data according to req.body params
async function get_data(req) { 
  try {
      var industry = req.body.industry
      var health = parseInt(req.body.health) // health here is an int between 0-2

      const loan_array = await all_loans.find({
        health: { $lt: health_values[health + 1], $gt: getRange(health) },
        industry: industry
      })

      return loan_array
  }
  catch (e) {
    console.log(e);
  }
}

function getRange(value) {
  switch(value) {
    case 2: 
      return 80
    case 1:
      return 50
    default: 
      return 0
  }
}