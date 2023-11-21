import React, { useEffect, useState } from 'react';

const MercadoPago = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=ID_REF&range=date_created&begin_date=NOW-30DAYS&end_date=NOW&store_id=47792478&pos_id=58930090', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer TEST-2126163715658017-112113-cfcd40ea1c0da38c16b84895c21bf286-434028202'
      }
    })
    .then(response => response.json())
    .then(data => setData(data))
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <div>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default MercadoPago;
