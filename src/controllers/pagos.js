import axios from "axios";


export const crearUsuarioDePrueba = async (req, res) => {
    try {
        const base_url = "https://api.mercadopago.com";
        const body = req.body;
        const test_user = await axios.post(`${base_url}/users/test_user`, body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
            }
        });

        return res.status(200).json({
            message: 'El usario de prueba se creo exitosamente',
            result: test_user.data
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            result: null
        })
    }
}

export const crearPreferencia = async (req, res) => {
    try {
        const base_url = "https://api.mercadopago.com";
        const body = req.body;
        const payments = await axios.post(`${base_url}/checkout/preferences`, body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
            }
        })

        return res.status(200).json({
            message: 'El usario de prueba se creo exitosamente',
            result: payments.data
        }
        )
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            result: null
        })
    }
}