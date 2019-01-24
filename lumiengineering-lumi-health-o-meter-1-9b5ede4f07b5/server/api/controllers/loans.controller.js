import { connect } from 'net';
import Loan from '../../models/loan';

var mongoose = require('mongoose')

var mongourl = 'mongodb://localhost:27017/lumi-health-meter'
mongoose.createConnection(mongourl, (error) => {
  if (error) { console.log(error) }
})

var all_loans = Loan
const health_values = [0, 50, 80, 110] // extra position workaround 

/**
 * Get all Loans
 * @param req
 * @param res
 * @returns void
 */
export async function get_loans(req, res) {
  var filtered_data = await get_data(req)
  return res.send(filtered_data)
}

export async function get_industries(req, res) {
  var industry_data = await get_unique_ind()
  console.log("DATA IN CONTROLLER: " + industry_data)
  return res.send(industry_data)
}

async function get_unique_ind() {
  try {
    const unique_array = await all_loans.distinct('industry')
    return unique_array
  } catch (e) {
    console.log(e);
  }
}

// include filter param
async function get_data(req) { 
  try {
      var industry = req.body.industry; // indsutry is string
      var health = parseInt(req.body.health); // health here is an int between 0-2

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