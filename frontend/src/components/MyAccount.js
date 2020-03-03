import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Authentication from './Authentication'
import Plot from 'react-plotly.js'

const moment = require('moment')


const diet = {
  calories: 2000,
  protein: 50,
  carbs: 260,
  fiber: 0,
  fat: 70,
  sat_fat: 20
}

class MyAccount extends React.Component {
  state = {
    userData: {},
    todayLogEntries: [],
    dailyLogEntries: [],
    dropDownSelection: 'calories'
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/myaccount', {
        headers: {
          Authorization: `Bearer ${Authentication.getToken('token')}`
        }
      })
      this.setState({ userData: res.data }, () => {
          this.setTodayLogEntries()
          this.setDailyLogEntries()
        })
      
    } catch (error) {
      console.log(error)
    }
  }

  setTodayLogEntries = () => {
    const todayLogEntries = this.state.userData.logs.filter(entry => {
      const today = moment(new Date()).format('YYYY-MM-DD')
      console.log(today)
      const entryDate = moment(entry.date).format('YYYY-MM-DD')
      return today === entryDate
    })
    this.setState({ todayLogEntries })
    console.log(todayLogEntries)
  }

  setDailyLogEntries = () => {
    const dailyLogEntries = this.state.userData.logs.reduce((foods, entry) => {
      const entryDate = entry.date
      if (!foods[entryDate]) {
        foods[entryDate] = []
      }
      foods[entryDate].push(entry.food)
      return foods
    }, {})
    this.setState({ dailyLogEntries })
    console.log(dailyLogEntries)
    
  }

  calculateProgress = nutrient => {
    const foodNutrition = this.state.todayLogEntries.map(entry => {
      return entry.food[nutrient]
    })
    console.log(foodNutrition.reduce((a, b) => Number(a) + Number(b), 0))
    return foodNutrition.reduce((a, b) => Number(a) + Number(b), 0)
  }

  calculateDailyTotal = nutrient => {
    const foodNutrition = this.state.dailyLogEntries.map(entry => entry.food[nutrient])
    const dailyTotal = foodNutrition.reduce((a, b) => Number(a) + Number(b), 0)
    console.log(dailyTotal)
    return dailyTotal
  }

  handleChange = ({ target: { name, value, checked, type } }) => {
    const newValue = type === 'checkbox' ? checked : value
    this.setState({ [name]: newValue })
  }

  render() {

    console.log(this.state)
    return (
      <section className='section'>
        <div className='container'>
          <div className='columns is-mobile is-centered'>
            <div className='column is-6'>
              <div className=''>Logo</div>
            </div>
            <div className='column is-6'>
              <div>Diet Log</div>
            </div>
          </div>
          <Link className='button is-primary is-fullwidth' to='/logs/new'>
            Log Your Food
          </Link>

          <div className='columns'>
            <div className='column is-12'>
              <div className='mobile'>
                <Plot
                  useResizeHandler
                  style={{ height: '100%', width: '100%' }}
                  data={[
                    {
                      x: [1, 2, 3, 4, 5, 6, 7],
                      y: [2, 6, 3, 5, 1, 6, 9],
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: { color: 'red' },
                      name: 'protein'
                    },
                    {
                      x: [1, 2, 3, 4, 5, 6, 7],
                      y: [2, 6, 3, 5, 1, 6, 9],
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: { color: 'yellow' },
                      name: 'calories'
                    },
                    {
                      x: [1, 2, 3, 4, 5, 6, 7],
                      y: [2, 6, 3, 5, 1, 6, 9],
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: { color: 'green' },
                      name: 'carbs'
                    },
                    {
                      x: [1, 2, 3, 4, 5, 6, 7],
                      y: [2, 6, 3, 5, 1, 6, 9],
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: { color: 'red' },
                      name: 'fat'
                    },
                    {
                      x: [1, 2, 3, 4, 8, 9, 0],
                      y: [4, 2, 1, 7, 2, 3, 6],
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: { color: 'blue' },
                      name: 'sat_fat'
                    }
                  ]}
                  layout={{
                    title: 'You weekly consumption',
                    margin: { t: 60, r: 10, l: 10, b: 30 },
                    autosize: true,
                    showlegend: true,
                    xaxis: {
                      autorange: true,
                      range: [moment().day(1), moment().day(7)],
                      rangeSelector: {buttons: [
                        {
                          count: 1,
                          label: '1 week',
                          step: 'week',
                          stepmode: 'backward'
                        },
                        {
                          count: 4, 
                          label: '4 weeks',
                          step: 'week',
                          stepmode: 'backward'
                        },
                        {step: 'all'}
                      ]},
                      rangeslider: {
                        range: []
                      },
                      type: 'date'
                    }
                  }}
                  config={{ displayModeBar: false }}
                />
              </div>

              <div>Your Day At A Glance</div>
              <div className='field'>
                <div className='select'>
                  <select
                    name='dropDownSelection'
                    onChange={this.handleChange}
                    value={this.state.dropDownSelection}
                  >
                    <option value='calories'>Calories</option>
                    <option value='protein'>Protein</option>
                    <option value='carbs'>Carbs</option>
                    <option value='fiber'>Fiber</option>
                    <option value='fat'>Fat</option>
                    <option value='sat_fat'>Sat Fat</option>
                  </select>
                </div>
              </div>
              <progress
                className='progress is-primary'
                value={this.calculateProgress(this.state.dropDownSelection)}
                max={diet[this.state.dropDownSelection]}
              ></progress>
              <div className='table-container'>
                <table className='table is-fullwidth'>
                  <thead>
                    <tr>
                      <th>Food</th>
                      <th>Portion</th>
                      <th>Measure</th>
                      <th>Unit</th>
                      <th>Grams</th>
                      <th>Calories</th>
                      <th>Protein</th>
                      <th>Carbs</th>
                      <th>Fiber</th>
                      <th>Fat</th>
                      <th>Sat. Fat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.todayLogEntries.map(entry => {
                      console.log(entry.food.sat_fat)
                      return (
                        <tr key={entry.id}>
                          <td>{entry.food.name}</td>
                          <td>{entry.portion}</td>
                          <td>{entry.food.measure}</td>
                          <td>{entry.food.unit}</td>
                          <td>{entry.food.grams}</td>
                          <td>{entry.food.calories}</td>
                          <td>{entry.food.protein}</td>
                          <td>{entry.food.carbs}</td>
                          <td>{entry.food.fiber}</td>
                          <td>{entry.food.fat}</td>
                          <td>{entry.food.sat_fat}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default MyAccount
