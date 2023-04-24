export default async function handler(req, res) {
  if (req.method === "GET") {
    const paypal_client_id = process.env.PAYPAL_CLIENT_ID;
    res.status(200).json({ paypal_client_id });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
