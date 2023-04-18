import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addQrDet } from './QR services/api';
import './createQr.css'

function CreateQr() {
   
  const [formValues, setFormValues] = useState({
    market: {
      digital: '',
      direct: {
        companies: '',
        stores: ''
      }
    },
    area: {
      country: '',
      state: '',
      city: ''
    },
    product: '',
    priceofp: '',
    batchnum: "",
    batchcount: '',
    game: ""
  });

  const [formValues1, setFormValues1] = useState({
    marketType:'',
    marketDirect:'',
    marketCompanies:'',
    marketStores:'',
    marketDigital:''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues1({
      ...formValues1,
      [name]: value
    });
  };

  const handleAreaChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      area: {
        ...formValues.area,
        [name]: value
      }
    });
  };
  const handleNestedInputChange = (event) => {
    const { name, value } = event.target;
    const [key, subKey, subSubKey] = name.split('.');
    if (subSubKey) {
      setFormValues(prevState => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          [subKey]: {
            ...prevState[key][subKey],
            [subSubKey]: value
          }
        }
      }));
    } else {
      setFormValues(prevState => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          [subKey]: value
        }
      }));
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(formValues);
    await addQrDet(formValues);
    setFormValues({
      market: {
        digital: '',
        direct: {
          companies: '',
          stores: ''
        }
      },
      area: {
        country: '',
        state: '',
        city: ''
      },
      product: '',
      priceofp: '',
      batchnum: "",
      batchcount: '',
      game: "",
   

    })
    navigate("/dashboard", { replace: true });
    
  };

  return (
    <Form className='my-form' onSubmit={handleSubmit}>
      <h1>Generate QR code</h1>
      <Form.Group controlId="marketType">
        <Form.Label>Market Type</Form.Label>
        <Form.Control as="select" name="marketType" onChange={handleFormChange}>
          <option value="">-- Select Market Type --</option>
          <option value="digital">Digital</option>
          <option value="direct">Direct</option>
        </Form.Control>
      </Form.Group>

      {formValues1.marketType === 'direct' && (
        <div>
          <Form.Group controlId="marketDirect">
            <Form.Label>Select Direct Market</Form.Label>
            <Form.Control as="select" name="marketDirect" onChange={handleFormChange} >
              <option value="">-- Select Direct Market --</option>
              <option value="companies">Companies</option>
              <option value="stores">Stores</option>
            </Form.Control>
          </Form.Group>

          {formValues1.marketDirect === 'companies' && (
            <Form.Group controlId="marketCompanies">
              <Form.Label>Companies</Form.Label>
              <Form.Control type="text" name="market.direct.companies"
              value={formValues.market.direct.companies} onChange={handleNestedInputChange} />
            </Form.Group>
          )}

          {formValues1.marketDirect === 'stores' && (
            <Form.Group controlId="marketStores">
              <Form.Label>Stores</Form.Label>
              <Form.Control type="text" name="market.direct.stores" 
             value={formValues.market.direct.stores} onChange={handleNestedInputChange} />
            </Form.Group>
          )}
        </div>
      )}

      {formValues1.marketType === 'digital' && (
        <Form.Group controlId="marketDigital">
          <Form.Label>Digital</Form.Label>
          <Form.Control type="text" name="market.digital"
          value={formValues.market.digital} onChange={handleNestedInputChange} />
        </Form.Group>
      )}

      <Form.Group controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control as="select" name="country" onChange={handleAreaChange}>
          <option value="">-- Select Country --</option>
          <option value="usa">USA</option>
          <option value="canada">Canada</option>
          <option value="uk">UK</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="state">
        <Form.Label>State</Form.Label>
        <Form.Control as="select" name="state" onChange={handleAreaChange}>
          <option value="">-- Select State --</option>
          <option value="ny">NY</option>
          <option value="ca">CA</option>
		   </Form.Control>
			 </Form.Group>
			 
	   <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control as="select" name="city" onChange={handleAreaChange}>
          <option value="">-- Select City --</option>
          <option value="newyork">New York</option>
          <option value="washington">Washington</option>
		   </Form.Control>
			 </Form.Group>
			     <Form.Group controlId="product">
        <Form.Label>Product</Form.Label>
        <Form.Control type="text"name="product" value={formValues.product} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group controlId="priceofp">
        <Form.Label>Price of Product</Form.Label>
        <Form.Control type="text"name="priceofp" value={formValues.priceofp} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group controlId="batchnum">
        <Form.Label>Batch Number</Form.Label>
        <Form.Control type="text"name="batchnum" value={formValues.batchnum} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group controlId="batchcount">
        <Form.Label>Batch Count</Form.Label>
        <Form.Control type="number"name="batchcount" value={formValues.batchcount} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group controlId="game">
        <Form.Label>Game</Form.Label>
        <Form.Control type="text"name="game" value={formValues.game} onChange={handleInputChange} />
      </Form.Group>
      
			 
			 	      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateQr;