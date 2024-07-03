import Stripe from "stripe";
import dotenv from "dotenv"
import { Router } from "express";
import express from "express";
import Order from "../models/order.js";

dotenv.config();


const stripe = Stripe(process.env.STRIPE_KEY);

const router = Router();

router.post('/create-checkout-session', async (req, res) => {

    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
            cart: JSON.stringify(req.body.cartItems)
        }
    })

    const line_items = req.body.cartItems.map(item => {
        return {
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                    images: [item.images[0]],
                    metadata: {
                        id: item.id,
                    }
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }
    })


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["US", "CA", "MX", "GB", "DE", "FR", "IT", "ES", "NL", "JP", "CN", "IN",
                "BR", "AU", "SG", "TR", "AE", "SA", "SE", "PL", "EG", "BE", "FI", "NO",
                "CH", "IE", "AT", "LU", "DK", "PT", "GR", "HU", "CZ", "IL", "MY"],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 0,
                        currency: "eur",
                    },
                    display_name: "Free shipping",
                    // Delivers between 5-7 business days
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 5,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 7,
                        },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 1500,
                        currency: "eur",
                    },
                    display_name: "Next day air",
                    // Delivers in exactly 1 business day
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 1,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 1,
                        },
                    },
                },
            },
        ],
        phone_number_collection: {
            enabled: true,
        },
        customer: customer.id,
        line_items,
        mode: 'payment',
        success_url: 'http://localhost:5173/checkout-success',
        cancel_url: 'http://localhost:5173/shop',
    });
    res.send({ url: session.url });
});


//Create order 

const createOrder = async (customer, data) => {
    const Items = JSON.parse(customer.metadata.cart);

    const newOrder = new Order({
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        products: Items,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        payment_status: data.payment_status
    });

    try {
        const savedOrder = await newOrder.save();
        console.log('Processed order:', savedOrder);
    } catch (error) {
        console.log(error);
    }
}

//Stripe Webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

/* endpointSecret = "whsec_368895f3555f6f91d977d6c5464fb2bc2c917fc6b7617b0a7616ee245e3362df"; */

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];

    let data;
    let eventType;

    if (endpointSecret) {

        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log('Webhook verified.');
        } catch (err) {
            console.log(`Webhook Error: ${err.message}`);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        data = event.data.object;
        eventType = event.type;

    } else {
        data = req.body.data.object;
        eventType = req.body.type;
    }

    // Handle the event

    if (eventType === 'checkout.session.completed') {
        stripe.customers
            .retrieve(data.customer)
            .then((customer) => {
                createOrder(customer, data);
            }).catch(err => console.log(err.message));
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
});


export default router;