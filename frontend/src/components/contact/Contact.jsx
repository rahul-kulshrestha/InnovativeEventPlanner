import React, { useState } from "react"
import Back from "../common/back/Back"
import "./contact.css"
const apiUrl = process.env.REACT_APP_API_URL;

const Contact = () => {
  const [contact, setContact] = useState({
      name:"",
      email:"",
      subject:"",
      message:""
  })
  const [errors, setErrors] = useState({});
  const handleOnChange = (event) =>{
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: value
    });
    
    // setContact(event.target.value);
    // console.log(event.target.value)
  }
  const handleOnSubmit = async (event)=>{
    event.preventDefault(); // Prevent the page from refreshing
    console.log('Form submitted:', contact);
      try {
        const response = await fetch(`${apiUrl}/api/contact/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contact),  // Convert the form data to JSON
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          setErrors(errorData)
          throw new Error(`HTTP error! status: ${response.status}`);
          // console.log(response)

        }
  
        const data = await response.json();  // Parse the JSON response
        console.log('Success:', data);
        setContact({
          name:"",
          email:"",
          subject:"",
          message:""
        })
        setErrors([])
        alert('Send request Successfully') // Handle the response data
  
      } catch (error) {
        console.error('Error:', error);  // Handle errors
      }
    };
  const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.6083566574607!2d77.25859631776873!3d28.731248150271124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfe979e19d4af%3A0xea27252aabe5b22f!2s500%2F10%2C%20Shaheed%20Bhagat%20Singh%20Colony%2C%20Karawal%20Nagar%2C%20Delhi%2C%20110094!5e0!3m2!1sen!2sin!4v1727169765567!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" '
  return (
    <>
      <Back title='Contact us' />
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          <div className='left row'>
            <iframe src={map}></iframe>
          </div>
          <div className='right row'>
            <h1>Contact us</h1>
            {/* <p>We're open for any suggestion or just to have a chat</p> */}

            <div className='items grid2'>
              <div className='box'>
                <h4>ADDRESS:</h4>
                <p>Karawal Nagar <br/>Delhi - 110094</p>
              </div>
              <div className='box'>
                <h4>EMAIL:</h4>
                <p> rahulkulshrestha011@gmail.com</p>
              </div>
              <div className='box'>
                <h4>PHONE:</h4>
                <p> + 1235 2355 98</p>
              </div>
            </div>

            <form onSubmit={handleOnSubmit}>
              {Object.keys(errors).length > 0 && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                  <ul>
                  {Object.entries(errors).map(([field, messages]) => (
                    <li key={field}>
                      {messages.join(', ')}
                    </li>
                  ))}
                  </ul>
                </div>
              )}
              <div className='flexSB'>
                <input type='text' placeholder='Name' name='name'  onChange={handleOnChange} value={contact.name} required/>
                <input type='email' placeholder='Email' name='email' onChange={handleOnChange}  value={contact.email} required/>
              </div>
              <input type='text' placeholder='Subject' name='subject' onChange={handleOnChange} value={contact.subject} required/>
              <textarea cols='30' rows='10' name='message' placeholder="Create a message here..." onChange={handleOnChange} value={contact.message} required>
              
              </textarea>
              <button className='primary-btn'>SEND MESSAGE</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact;
