import './welcome.css';

function WelcomeHeader() {
  return (
    <div className='p-5 d-flex'>
      <h2 className='text-danger'>StreamMax</h2>
      <select className="form-select w-25 ms-auto select-language-input" aria-label="Default select example">
        <option value="English">English</option>
        <option value="Portugues">Português</option>
      </select>
      <button className='btn btn-danger ms-4'>Sign In</button>
    </div>
  );
}

export default WelcomeHeader;
