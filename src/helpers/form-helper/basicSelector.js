import Form from 'react-bootstrap/Form';
import './selector.scss';


function BasicSelector(props) {
    const {name, options, handleClick} = props
  return (
    <Form.Select aria-label="select" size="lg" name={name} onChange={handleClick}>
      {
        options.map((option, idx) => {
            return (
                <option className='option' key={idx} value={option} >{option}</option>
            )
      })}
     
    </Form.Select>
  );
}

export default BasicSelector;