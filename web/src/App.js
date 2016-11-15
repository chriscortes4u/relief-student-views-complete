const React = require('react')
const ResourceForm = require('./pages/resources/form')


const App = React.createClass({
  render(){
    return(
    <div>
      <h1>
        Add Person
      </h1>
      <ResourceForm />
    </div>
    )
  }
})


module.exports = App
