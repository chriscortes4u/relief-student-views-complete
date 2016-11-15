const React = require('react')
const xhr = require('xhr')

const ResourceForm = React.createClass({
  getInitialState(){
    return ({
      error:"",
      result:{},
      person: {
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
      }
    })
  },
  handleChange(field){
    return e => {
      var person = this.state.person
      person[field] = e.target.value
      this.setState({person})
    }
  },
  handleSubmit(e){
    e.preventDefault()
    xhr({
      url: 'http://localhost:4000/person',
      method: 'POST',
      json: this.state.person
    },(err, res) => {
      if (err) return this.setState({error: err.message})
      this.setState({result: res})
    })
  },
  render(){
    return(
      <div>
      {this.state.error}
      {JSON.stringify(this.state.result, null, 2)}
        <h1>Here</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
            first name
            </label>
            <input
            value={this.state.firstName}
            onChange={this.handleChange('firstName')} />
          </div>
          <div>
            <label>
            last name
            </label>
            <input
            value={this.state.lastName}
            onChange={this.handleChange('lastName')}  />
          </div>
          <div>
            <label>
              phone
            </label>
            <input
            value={this.state.phone}
            onChange={this.handleChange('phone')}/>
          </div>
          <div>
            <label>
              email
            </label>
            <input
            value={this.state.email}
              onChange={this.handleChange('email')}/>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
        <pre>
          {JSON.stringify(this.state.person, null, 2)}
        </pre>
      </div>
    )
  }
})

module.exports = ResourceForm
