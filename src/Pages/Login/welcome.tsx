import WelcomeHeader from '../../Components/Headers/Login/welcome';
import './welcome.css';

function WelcomePage() {
  return (
    <div className='welcome-main'>
      <WelcomeHeader />
      <div className='d-flex flex-column align-items-center my-5'>
        <h3 className='text-light display-2'>Unlimited movies, TV shows, and more</h3>
        <p className='text-light mt-3 mt-5'style={{fontSize:'1.75rem'}}>Watch anywhere. Cancel anytime</p>
        <p className='text-light mb-3 mb-5'style={{fontSize:'1.75rem'}}>Ready to watch? Enter your email to create or restart your membership.</p>
        <form className='d-flex w-50'>
          <input type="text" className="form-control mx-3 w-75" placeholder="Your email here" />
          <button className='btn btn-lg btn-danger mx-3 w-25'>Get Started {'>'}</button>
        </form>
      </div>
    </div>
  );
}

export default WelcomePage;
