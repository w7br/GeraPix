import React, { useEffect, useState } from 'react';

const MercadoPago = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Idempotency-Key': '0d5020ed-1af6-469c-ae06-c3bec19954bb',
        'Authorization': 'Bearer TEST-2126163715658017-112113-cfcd40ea1c0da38c16b84895c21bf286-434028202'
      },
      body: JSON.stringify({
        "additional_info": {
          "items": [
            {
              "id": "MLB2907679857",
              "title": "Point Mini",
              "description": "Point product for card payments via Bluetooth.",
              "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png",
              "category_id": "electronics",
              "quantity": 1,
              "unit_price": 58.8,
              "type": "electronics",
              "event_date": "2023-12-31T09:37:52.000-04:00",
              "warranty": false,
              "category_descriptor": {
                "passenger": {},
                "route": {}
              }
            }
          ],
          "payer": {
            "first_name": "Test",
            "last_name": "Test",
            "phone": {
              "area_code": 11,
              "number": "987654321"
            },
            "address": {
              "street_number": null
            }
          },
          "shipments": {
            "receiver_address": {
              "zip_code": "12312-123",
              "state_name": "Rio de Janeiro",
              "city_name": "Buzios",
              "street_name": "Av das Nacoes Unidas",
              "street_number": 3003
            },
            "width": null,
            "height": null
          }
        },
        "application_fee": null,
        "binary_mode": false,
        "campaign_id": null,
        "capture": false,
        "coupon_amount": null,
        "description": "Payment for product",
        "differential_pricing_id": null,
        "external_reference": "MP0001",
        "installments": 1,
        "metadata": null,
        "payer": {
          "entity_type": "individual",
          "type": "customer",
          "email": "test_user_123@testuser.com",
          "identification": {
            "type": "CPF",
            "number": "95749019047"
          }
        },
        "payment_method_id": "master",
        "token": "ff8080814c11e237014c1ff593b57b4d",
        "transaction_amount": 58.8
      })
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




// import React, { useEffect, useState } from 'react';

// const MercadoPago = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch('https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=ID_REF&range=date_created&begin_date=NOW-30DAYS&end_date=NOW&store_id=47792478&pos_id=58930090', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer TEST-2126163715658017-112113-cfcd40ea1c0da38c16b84895c21bf286-434028202'
//       }
//     })
//     .then(response => response.json())
//     .then(data => setData(data))
//     .catch((error) => {
//       console.error('Error:', error);
//     });
//   }, []);

//   return (
//     <div>
//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//     </div>
//   );
// }

// export default MercadoPago;
