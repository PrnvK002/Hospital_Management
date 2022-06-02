import React from 'react'
// import { MDBFooter } from 'mdb-react-ui-kit';


const Footer = () => {
  return (
    <div className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>

        <div>
          <p className='me-4 text-reset'>
            <i className='fab fa-facebook-f'></i>
          </p>
          <p className='me-4 text-reset'>
            <i className='fab fa-twitter'></i>
          </p>
          <p className='me-4 text-reset'>
            <i className='fab fa-google'></i>
          </p>
          <p className='me-4 text-reset'>
            <i className='fab fa-instagram'></i>
          </p>
          <p className='me-4 text-reset'>
            <i className='fab fa-linkedin'></i>
          </p>
          <p className='me-4 text-reset'>
            <i className='fab fa-github'></i>
          </p>
        </div>
      </section>

      <section className=''>
        <div className='container text-center text-md-start mt-5'>
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <i className='fas fa-gem me-3'></i>Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p>
            </div>

            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <p className='text-reset'>
                  Angular
                </p>
              </p>
              <p>
                <p className='text-reset'>
                  React
                </p>
              </p>
              <p>
                <p className='text-reset'>
                  Vue
                </p>
              </p>
              <p>
                <p className='text-reset'>
                  Laravel
                </p>
              </p>
            </div>

            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <p className='text-reset'>
                  Pricing
                </p>
              </p>
              <p>
                <p className='text-reset'>
                  Settings
                </p>
              </p>
              <p>
                <p className='text-reset'>
                  Orders
                </p>
              </p>
              <p>
                <p className='text-reset'>
                  Help
                </p>
              </p>
            </div>

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <i className='fas fa-home me-3'></i> New York, NY 10012, US
              </p>
              <p>
                <i className='fas fa-envelope me-3'></i>
                info@example.com
              </p>
              <p>
                <i className='fas fa-phone me-3'></i> + 01 234 567 88
              </p>
              <p>
                <i className='fas fa-print me-3'></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a href="https://prnvk002.github.io/Personal-website/" className='text-reset fw-bold'>
          Pranav KV
        </a>
      </div>
    </div>
  )
}

export default Footer