# Bienvenidos al repositorio del Curso de Backend

## Aca haremos el temario del curso


## Mercado Pago Developers Create new User
- https://api.mercadopago.com/users/test_user
- Formato del json a enviar en la ruta crearPreferencia

```json
{
	"payer_email": "test_user_1635385@testuser.com",
	"items": [
		{
			"title": "Samsung Galaxy S22",
			"description": "Celular de 256GB Camara 30MP 16RAM",
			"picture_url": "https://www.png.com/2h4es",
			"category_id": "category1",
			"quantity": 1,
			"unit_price": 5400
		}
	],
	"back_urls":{
		"failure": "/failure",
		"pending": "/pending",
		"success": "/success"
	}
}
```